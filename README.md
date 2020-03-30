# GitHub Action: Packer

> GitHub Action for running Packer [commands](https://packer.io/docs/commands/index.html).

## Table of Contents

- [GitHub Action: Packer](#github-action-packer)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Inputs](#inputs)
      - [command](#command)
      - [arguments](#arguments)
      - [target](#target)
  - [Notes](#notes)
  - [Author Information](#author-information)
  - [License](#license)

## Usage

Add the Action to your [GitHub Workflow](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow#creating-a-workflow-file) like so:

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
        uses: operatehappy/packer-github-actions@master
        with:
          command: fix

      # validate templates
      - name: Validate Template
        uses: operatehappy/packer-github-actions@master
        with:
          command: validate
          arguments: -syntax-only
          target: artifacts.pkr.json packer.json

      # build artifact
      - name: Build Artifact
        uses: operatehappy/packer-github-action
        with:
          command: build
          arguments: "-color=false -on-error=abort"
          target: artifacts.pkr.json packer.json

      # additional steps to process artifacts
```

### Inputs

| Name        | Description           | Required | Default              |
|-------------|-----------------------|----------|----------------------|
| `command`   | command to execute    | yes      |                      |
| `arguments` | arguments for command | no       |                      |
| `target`    | file(s) to target     | yes      | `artifacts.pkr.json` |

#### `command`

`command` supports the following subset of Packer [CLI commands](https://packer.io/docs/commands/index.html):

- [build](https://packer.io/docs/commands/build.html) to generate a set of artifacts from a template
- [fix](https://packer.io/docs/commands/fix.html) to find and correct backwards incompatible stanzas in a template
- [validate](https://packer.io/docs/commands/validate.html) to validate the syntax and configuration of a template

Other CLI commands (`console`, `inspect` and `version`) are _technically_ supported, but have limited utility in a GitHub Actions Workflow, due to their interactive nature.

#### `arguments`

`arguments` supports all options available for the respective `command`.

The arguments must be provided as a single string. Multiple arguments should be concatenated like so: "-color=false -on-error=abort"

#### `target`

`target` supports a string consisting of one or more file paths:

 ```yaml
    # single file
    target: artifacts.pkr.json

    # multiple files, separated by whitespace
    target: artifacts.pkr.json packer.json
```

 The Action will iterate over each file and run each `command`, separately.

## Notes

- To enable debug logging, create a secret named `ACTIONS_STEP_DEBUG` with the value `true`. See [here](https://help.github.com/en/actions/reference/workflow-commands-for-github-actions#setting-a-debug-message) for more information.

## Author Information

This module is maintained by the contributors listed on [GitHub](https://github.com/operatehappy/packer-github-action/graphs/contributors).

Development of this module was sponsored by [Operate Happy](https://github.com/operatehappy).

## License

Licensed under the Apache License, Version 2.0 (the "License").

You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an _"AS IS"_ basis, without WARRANTIES or conditions of any kind, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
