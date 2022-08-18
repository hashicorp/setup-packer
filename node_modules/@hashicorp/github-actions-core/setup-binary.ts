import * as core from "@actions/core";
import * as hc from "@hashicorp/js-releases";
import * as io from "@actions/io";
import * as cache from "@actions/tool-cache";
import * as sys from "./system";
import * as semver from "semver";
import cp from "child_process";
import path from "path";
import { ok } from "assert";

export async function setupBinary(binaryName: string, version: string) {
  let userAgent = `setup-${binaryName} (GitHub Actions)`;
  let binaryPath = await fetchBinary(binaryName, version, userAgent);

  core.addPath(binaryPath);
  core.info(`${binaryName}:${version} added to path`)
  let binary = await io.which(binaryName);
  let binaryVersion = (cp.execSync(`${binary} version`) || "").toString();

  core.setOutput("version", parseVersion(binaryVersion));
}

async function fetchBinary(
  binaryName: string,
  version: string,
  userAgent: string
): Promise<string> {
  const osPlatform = sys.getPlatform();
  const osArch = sys.getArch();
  const tmpDir = getTempDir();

  let binaryPath: string;

  core.debug(`Finding release that matches ${version}.`);

  const isValidVersion = semver.validRange(version);
  if (!isValidVersion && version !== "latest") {
    throw new Error(
      "Invalid version, only valid semver versions or 'latest' are allowed"
    );
  }

  let release = await hc.getRelease(binaryName, version, userAgent);
  const nameAndVersion = binaryName + ` ` + version;
  const nameAndPlatform = binaryName + `_${osPlatform}`;

  core.debug(`Found ${nameAndVersion}.`);

  core.debug(`Checking cache for ${nameAndVersion}.`);

  core.debug(`Cache binary: ${nameAndPlatform}`);
  binaryPath = cache.find(nameAndPlatform, version);

  if (binaryPath) {
    core.debug(`Found ${nameAndVersion} in cache at ${binaryPath}.`);
    return binaryPath;
  }

  core.debug(`${nameAndVersion} not found in cache.`);

  core.debug(`Getting download URL for ${nameAndVersion}.`);
  let build = release.getBuild(osPlatform, osArch);
  core.debug(`Download URL: ${build.url}`);

  core.info(`Downloading ${build.filename}.`);
  let downloadPath = path.join(tmpDir, build.filename);

  core.debug(`Download path: ${downloadPath}`);
  await release.download(build.url, downloadPath, userAgent);

  core.debug(`Verifying ${build.filename}.`);
  await release.verify(downloadPath, build.filename);

  core.debug(`Extracting ${build.filename}.`);
  const extractedPath = await cache.extractZip(downloadPath);
  core.debug(`Extracted path: ${extractedPath}`);

  binaryPath = await cache.cacheDir(extractedPath, nameAndPlatform, version);
  core.debug(`Cached ${nameAndVersion} at ${binaryPath}.`);

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
