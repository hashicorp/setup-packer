# see https://hub.docker.com/r/hashicorp/packer/tags for all available tags
# The following is hashicorp/packer:light-1.14.1
FROM hashicorp/packer:light@sha256:0bd39e557562cd3af4f596adb30a9c5b32b46d4a62c301e5a78f507e31610625

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
