import * as core from "@actions/core";
import * as hc from "@hashicorp/github-actions-core";

async function main() {
  try {
    await hc.getHashicorpRelease("nomad-pack", "0.0.1-techpreview2");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

// main();
