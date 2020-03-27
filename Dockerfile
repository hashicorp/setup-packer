FROM hashicorp/packer:light@sha256:5ebe2fff60ee439d251f2bcbbb71efef6918439dfd04415fc1ab5bd5a212c591

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
