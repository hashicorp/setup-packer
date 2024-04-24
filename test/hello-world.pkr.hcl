# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: Apache-2.0

packer {
  required_plugins {
    amazon = {
      version = ">= 1.3.2"
      source  = "github.com/hashicorp/amazon"
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
