import * as core from "@actions/core";
import * as hc from "@hashicorp/github-actions-core";

async function main() {
  try {
    await hc.getHashiCorpReleases("","");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

main();
