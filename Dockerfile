# see https://hub.docker.com/r/hashicorp/packer/tags for all available tags
FROM hashicorp/packer:light@sha256:f795aace438ef92e738228c21d5ceb7d5dd73ceb7e0b1efab5b0e90cbc4d4dcd

RUN apk add ansible=2.10.7-r0

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
