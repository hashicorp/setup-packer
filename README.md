# GitHub Action: Packer

> GitHub Action for running Packer [commands](https://www.packer.io/docs/commands).

## Table of Contents

- [GitHub Action: Packer](#github-action-packer)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Inputs](#inputs)
      - [`command`](#command)
      - [`arguments`](#arguments)
      - [`target`](#target)
      - [`working_directory`](#working_directory)
  - [Detailed logs](#detailed-logs)
  - [Notes](#notes)
  - [Author Information](#author-information)
  - [License](#license)

## Usage

Add the Action to your [GitHub Workflow](https://docs.github.com/en/actions/learn-github-actions#creating-a-workflow-file) like so:

```yaml
---

name: Packer

on:
  push:

jobs:
  packer:
    runs-on: ubuntu-latest
    name: packer

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      # fix backwards incompatibilities in template
      - name: Fix Template
        uses: hashicorp/packer-github-actions@master
        with:
          command: fix

      # validate templates
      - name: Validate Template
        uses: hashicorp/packer-github-actions@master
        with:
          command: validate
          arguments: -syntax-only
          target: packer.pkr.hcl

      # build artifact
      - name: Build Artifact
        uses: hashicorp/packer-github-actions@master
        with:
          command: build
          arguments: "-color=false -on-error=abort"
          target: packer.pkr.hcl
          working_directory: infrastructure/packer
        env:
          PACKER_LOG: 1
          HCP_CLIENT_ID: ${{ secrets.HCP_CLIENT_ID }}
          HCP_CLIENT_SECRET: ${{ secrets.HCP_CLIENT_SECRET }}

      # additional steps to process artifacts
```

### Inputs

| Name                | Description                    | Required | Default |
|---------------------|--------------------------------|----------|---------|
| `command`           | command to execute             | yes      |         |
| `arguments`         | arguments for command          | no       |         |
| `target`            | file(s) or directory to target | no       |   `.`   |
| `working_directory` | working directory for command  | no       |   `.`   |

#### `command`

`command` supports the following subset of Packer [CLI commands](https://packer.io/docs/commands/index.html):

- [init](https://www.packer.io/docs/commands/init) to download Packer plugin binaries
- [build](https://www.packer.io/docs/commands/build) to generate a set of artifacts from a template
- [fix](https://www.packer.io/docs/commands/fix) to find and correct backwards incompatible stanzas in a template
- [validate](https://www.packer.io/docs/commands/validate) to validate the syntax and configuration of a template

Other CLI commands (`console`, `inspect` and `version`) are _technically_ supported, but have limited utility in a GitHub Actions Workflow, due to their interactive nature.

#### `arguments`

`arguments` supports all options available for the respective `command`.

The arguments must be provided as a single string. Multiple arguments should be concatenated like so: `-color=false -on-error=abort`

#### `target`

`target` supports a string consisting of one or more file or directory paths:

 ```yaml
    # single file
    target: artifacts.pkr.hcl

    # multiple files, separated by whitespace
    target: artifacts.pkr.hcl packer.pkr.hcl

    # working directory
    target: .
```

 The Action will iterate over each file and run each `command`, separately.

#### `working_directory`

`working_directory` supports a string consisting of a directory path. This should be a relative path in your repository where you want the packer command to run.

## Detailed logs

Packer has an option to enable more detailed logs by setting the `PACKER_LOG` environment variable.
Any value other than `""` (empty string) and `"0"`, will cause detailed logs to appear on stderr.

To set `PACKER_LOG=1`, simply define the environment variable in the step configuration like:

```yaml
  # build artifact
  - name: Build Artifact
    uses: hashicorp/packer-github-actions@master
    with:
      command: build
      arguments: "-color=false -on-error=abort"
      target: packer.pkr.hcl
    env:
      PACKER_LOG: 1
```

## Notes

- To enable debug logging, create a secret named `ACTIONS_STEP_DEBUG` with the value `true`. See [here](https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions#setting-a-debug-message) for more information.

- If you want to use HCP Packer as central image repository, do not forget to add HCP Secrets under your repo settings. See [here](https://github.com/Azure/actions-workflow-samples/blob/master/assets/create-secrets-for-GitHub-workflows.md)
- When using [HCP Packer Registry](https://cloud.hashicorp.com/docs/packer), you will need to set `HCP_CLIENT_ID` and `HCP_CLIENT_SECRET` environment variables to your job steps. See [Service Principals](https://cloud.hashicorp.com/docs/hcp/access-control/service-principals) guide for how you can generate these credentials, and [Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) guide for how you can configure and reference secrets in your Actions.

## Author Information

This module is maintained by the contributors listed on [GitHub](https://github.com/hashicorp/packer-github-actions/graphs/contributors).

Development of this module was sponsored by [Operate Happy](https://github.com/operatehappy).

## License

Licensed under the Apache License, Version 2.0 (the "License").

You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an _"AS IS"_ basis, without WARRANTIES or conditions of any kind, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
