/**
 * Copyright HashiCorp, Inc. 2020, 2024
 * SPDX-License-Identifier: Apache-2.0
 */

import * as core from "@actions/core";
import * as hc from "@hashicorp/github-actions-core";

export const PRODUCT = "packer";

async function main() {
  const version = core.getInput("version");
  if (version == null) {
    core.setFailed("Required field 'version' not set");
    return;
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
