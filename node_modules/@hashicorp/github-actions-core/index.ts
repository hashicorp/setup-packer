import * as core from "@actions/core";
import { setupBinary } from "./setup-binary";

export async function getHashicorpRelease(binary: string, version: string) {
  if (version === "") {
    version = "latest"
  }
  core.info(`Installing ${binary}:${version} and adding it to GitHub Actions Path`);
  try {
    await setupBinary(binary, version);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}
