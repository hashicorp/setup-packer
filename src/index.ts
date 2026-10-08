/**
 * Copyright IBM Corp. 2022, 2026
 * SPDX-License-Identifier: Apache-2.0
 */

import * as core from "@actions/core";
import * as hc from "@hashicorp/github-actions-core";
import * as fs from "fs";

export const PRODUCT = "packer";

// Parses .tool-versions content (asdf/mise format) and returns the first
// packer version, or an empty string when none is declared. Lines look like
// `packer 1.10.0`; comments (#) and blank lines are ignored.
export function parseToolVersions(content: string): string {
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const [tool, version] = trimmed.split(/\s+/);
    if (tool === PRODUCT && version) {
      return version;
    }
  }
  return "";
}

// Reads a .tool-versions file and returns the packer version declared in it.
export function getVersionFromFile(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(`The version-file '${filePath}' does not exist`);
  }
  const content = fs.readFileSync(filePath, "utf8");
  const version = parseToolVersions(content);
  if (!version) {
    throw new Error(`No packer version found in '${filePath}'`);
  }
  return version;
}

async function main() {
  let version = core.getInput("version");
  const versionFile = core.getInput("version-file");

  if (versionFile) {
    if (version && version !== "latest") {
      core.warning(
        "Both 'version' and 'version-file' inputs are specified, only 'version' will be used."
      );
    } else {
      version = getVersionFromFile(versionFile);
      core.info(`Resolved Packer version '${version}' from '${versionFile}'`);
    }
  }

  if (!version) {
    version = "latest";
  }

  try {
    await hc.getHashicorpRelease(PRODUCT, version);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

main();
