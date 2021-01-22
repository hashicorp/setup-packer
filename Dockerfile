FROM hashicorp/packer:light@sha256:9db70fdca396908e9b2082cc600839fdd76b3ebd2ca48d674cf967b31ebfc81d

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
