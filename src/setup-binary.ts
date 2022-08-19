import * as core from "@actions/core";
import * as hc from "@hashicorp/js-releases";
import * as io from "@actions/io";
import * as cache from "@actions/tool-cache";
import * as sys from "./system";
import cp from "child_process";
import path from "path";
import {ok} from "assert";

const BINARY_NAME = "packer";
const USER_AGENT = "setup-${BINARY_NAME} (GitHub Actions)";

export async function setupBinary() {
  const versionSpec = core.getInput("version");

  let binaryPath = await fetchBinary(versionSpec);

  core.info(`Adding ` + BINARY_NAME + ` to PATH.`);
  core.addPath(binaryPath);

  let binary = await io.which(BINARY_NAME);
  let binaryVersion = (cp.execSync(`${binary} version`) || "").toString();

  core.info(binaryVersion);
  core.setOutput("version", parseVersion(binaryVersion));
}

export async function fetchBinary(versionSpec: string): Promise<string> {
  const osPlatform = sys.getPlatform();
  const osArch = sys.getArch();
  const tmpDir = getTempDir();

  let binaryPath: string;

  core.info(`Finding release that matches ${versionSpec}.`);
  let release = await hc.getRelease(BINARY_NAME, versionSpec, USER_AGENT);

  const {version} = release;
  const nameAndVersion = BINARY_NAME + ` ` + version;
  const nameAndPlatform = BINARY_NAME + `_${osPlatform}`;

  core.info(`Found ${nameAndVersion}.`);

  core.info(`Checking cache for ${nameAndVersion}.`);

  core.debug(`Cache binary: ${nameAndPlatform}`);
  binaryPath = cache.find(nameAndPlatform, version);

  if (binaryPath) {
    core.info(`Found ${nameAndVersion} in cache at ${binaryPath}.`);
    return binaryPath;
  }

  core.info(`${nameAndVersion} not found in cache.`);

  core.info(`Getting download URL for ${nameAndVersion}.`);
  let build = release.getBuild(osPlatform, osArch);
  core.debug(`Download URL: ${build.url}`);

  core.info(`Downloading ${build.filename}.`);
  let downloadPath = path.join(tmpDir, build.filename);

  core.debug(`Download path: ${downloadPath}`);
  await release.download(build.url, downloadPath, USER_AGENT);

  core.info(`Verifying ${build.filename}.`);
  await release.verify(downloadPath, build.filename);

  core.info(`Extracting ${build.filename}.`);
  const extractedPath = await cache.extractZip(downloadPath);
  core.debug(`Extracted path: ${extractedPath}`);

  binaryPath = await cache.cacheDir(extractedPath, nameAndPlatform, version);
  core.info(`Cached ${nameAndVersion} at ${binaryPath}.`);

  return binaryPath;
}

export function parseVersion(version: string): string {
  return version.split("\n")[0].split(" ")[1];
}

function getTempDir(): string {
  const tmpDir = process.env["RUNNER_TEMP"] || "";
  ok(tmpDir, "Expected RUNNER_TEMP to be defined");
  return tmpDir;
}
