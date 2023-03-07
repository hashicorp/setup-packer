# GitHub Action: `setup-packer`

The `hashicorp/setup-packer` Action sets up the [Packer](https://www.packer.io) CLI in your GitHub Actions workflow by adding the `packer` binary to `PATH`.

## Table of Contents

<!-- TOC -->
* [GitHub Action: `setup-packer`](#github-action--setup-packer)
  * [Table of Contents](#table-of-contents)
  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Inputs](#inputs)
  * [Outputs](#outputs)
  * [Author Information](#author-information)
  * [License](#license)
<!-- TOC -->

## Requirements

This GitHub Actions supports all commands that are available in the `packer` CLI.

The [`build`](https://developer.hashicorp.com/packer/docs/commands/build) command may require access to provider-specific credentials.

Other [environment variables](https://developer.hashicorp.com/packer/docs/commands#environment-variables) (such as `PACKER_LOG`) may be set as normal and will be picked up accordingly.

## Usage

1.) Create a GitHub Actions Workflow file (e.g.: `.github/workflows/packer.yml`):

```yaml
name: packer

on:
  - push

jobs:
  packer:
    runs-on: ubuntu-latest
    name: Run Packer
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup `packer`
        uses: hashicorp/setup-packer@main
        id: setup
        with:
          version: "1.8.6" # or `latest`

      - name: Run `packer init`
        id: init
        run: "packer init ./image.pkr.hcl"

      - name: Run `packer validate`
        id: validate
        run: "packer validate ./image.pkr.hcl"
```

In the above example, the following definitions have been set.

- The event trigger has been set to `push`. For a complete list, see [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).
- The origin of this GitHub Action has been set as `hashicorp/setup-packer@main`. For newer versions, see the [Releases](https://github.com/hashicorp/setup-packer/releases).
- The version of `packer` to set up has been set as `1.8.6`. For a complete list, see [releases.hashicorp.com](https://releases.hashicorp.com/packer/).
- The Packer manifest to interact with has been set as `./image.pkr.hcl`

These definitions may require updating to suit your deployment, such as specifying [self-hosted](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#choosing-self-hosted-runners) runners.

Additionally, you may configure [outputs](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-defining-outputs-for-a-job) to consume return values from the Action's operations.

## Inputs

This section contains a list of all inputs that may be set for this Action.

- `version` - (required) The version of `packer` to install. Defaults to `latest`.

## Outputs

This section contains a list of all outputs that can be consumed from this Action.

- `version` -  The version of `packer` that was installed.

## Author Information

This GitHub Action is maintained by the contributors listed on [GitHub](https://github.com/hashicorp/setup-packer/graphs/contributors).

The original code of this repository is based on work done by [Matthew Sanabria](https://github.com/sudomateo) as part of the [setup-packer](https://github.com/sudomateo/setup-packer) GitHub Action.

## License

Licensed under the Apache License, Version 2.0 (the "License").

You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an _"AS IS"_ basis, without WARRANTIES or conditions of any kind, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
