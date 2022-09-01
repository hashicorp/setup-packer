import * as core from "@actions/core";
import * as hc from "@hashicorp/github-actions-core";

async function main() {
  try {
    await hc.getHashicorpRelease("packer", "1.8.1");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

main();
