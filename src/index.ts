/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as core from "@actions/core";
import * as hc from "@hashicorp/github-actions-core";

async function main() {
  const version = core.getInput("version");
  if (version == null) {
    core.setFailed("Required field 'version' not set");
    return;
  }
  try {
    await hc.getHashicorpRelease("packer", version);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

main();
