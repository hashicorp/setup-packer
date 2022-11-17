# see https://hub.docker.com/r/hashicorp/packer/tags for all available tags
FROM hashicorp/packer:light@sha256:dd9868ae2b4d4fc658ed32ab9f3277b0a85ad266f8880351f2d51de038e4db5c

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
