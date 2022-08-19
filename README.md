# GitHub Action: setup-packer

The `hashicorp/setup-packer` Action sets up the `packer` CLI in your GitHub Actions workflow by adding the binary to `PATH`.

## Table of Contents

- [GitHub Action: setup-packer](#github-action-setup-packer)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Usage](#usage)
  - [Author Information](#author-information)
  - [License](#license)

## Requirements

This GitHub Actions supports all commands that are available in the `packer` CLI.

The [`build`](https://www.packer.io/docs/commands/build) command may require access to provider-specific credentials.

Other [environment variables](https://www.packer.io/docs/commands#environment-variables) (such as `PACKER_LOG`) may be set as normal and will be picked up accordingly.

## Usage

TODO

## Inputs

This section contains a list of all inputs that may be set for this Action.

- `version` - (required) The version of `nomad-pack` to install. Defaults to `latest`.

## Outputs

This section contains a list of all outputs that can be consumed from this Action.

- `version` -  The version of `nomad-pack` that was installed.

## Author Information

This GitHub Action is maintained by the contributors listed on [GitHub](https://github.com/hashicorp/setup-packer/graphs/contributors).

The original code of this repository is based on work done by [Matthew Sanabria](https://github.com/sudomateo) as part of the [setup-packer](https://github.com/sudomateo/setup-packer) GitHub Action.

## License

Licensed under the Apache License, Version 2.0 (the "License").

You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an _"AS IS"_ basis, without WARRANTIES or conditions of any kind, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
