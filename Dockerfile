FROM hashicorp/packer:light@sha256:523457b5371562c4d9c21621ee85c71c31e7ff53d5ec303a5daf07c55531b84e

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
