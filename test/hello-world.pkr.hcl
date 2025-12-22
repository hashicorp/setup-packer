# Copyright HashiCorp, Inc. 2020, 2024
# SPDX-License-Identifier: Apache-2.0

packer {
  required_plugins {
    # see https://github.com/hashicorp/packer-plugin-hashicups/releases/tag/v1.0.2
    hashicups = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/hashicups"
    }
  }
}

# file: builds.pkr.hcl
source "file" "basic_example" {
  content = "Lorem ipsum dolor sit amet"
  target  = "sample_artifact"
}

variable "bucket_name" {
  type    = string
  default = "hello-world"
}

build {
  hcp_packer_registry {
    bucket_name = "${var.bucket_name}"

    description = <<EOT
Some nice description about the image which artifact is being published to HCP Packer Registry. =D
    EOT

    bucket_labels = {
      "version" = "1.2.3",
      "foo"     = "bar",
    }
  }

  sources = [
    "sources.file.basic_example"
  ]
}
