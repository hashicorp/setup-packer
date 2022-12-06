# file: builds.pkr.hcl
source "file" "basic-example" {
  content = "Lorem ipsum dolor sit amet"
  target = "sample_artifact"
}

variable "bucket_name" {
  type = string
  default = "hello-world"
}

build {
   hcp_packer_registry {
    bucket_name = "${var.bucket_name}"

    description = <<EOT
Some nice description about the image which artifact is being published to HCP Packer Registry. =D
    EOT

    labels = {
      "foo-version" = "3.4.0",
      "foo" = "bar",
    }
  }

  sources = ["sources.file.basic-example"]
}

