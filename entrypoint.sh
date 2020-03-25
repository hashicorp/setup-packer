#!/bin/sh

# make sure INPUT_COMMAND is set
if [ -z "${INPUT_COMMAND}" ]; then
  echo "Required variable `command` is missing"
  exit 1
fi

if [ -z "${INPUT_ARGUMENTS}" ]; then
  OPERATION="${INPUT_COMMAND} ${INPUT_ARGUMENTS} ${INPUT_TARGET}"
else
  OPERATION="${INPUT_COMMAND} ${INPUT_TARGET}"
fi

# shellcheck disable=SC2086
packer ${OPERATION}
