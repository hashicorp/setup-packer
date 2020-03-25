FROM hashicorp/packer:light@sha256:df7feeff930b04a42f2027dd0924392246f7b5a38f0c56531a2d14cd0d1e9408

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
