#!/usr/bin/env bash

set -e

# fail if INPUT_COMMAND is not set
if [ -z "${INPUT_COMMAND}" ]; then
  echo "Required variable \`command\` is missing"
  exit 1
fi

if [ -n "${INPUT_WORKING_DIRECTORY}" ]; then
  cd "${INPUT_WORKING_DIRECTORY}"
fi

# assemble operation
if [ -z "${INPUT_ARGUMENTS}" ]; then
  OPERATION="packer ${INPUT_COMMAND}"
else
  OPERATION="packer ${INPUT_COMMAND} ${INPUT_ARGUMENTS}"
fi

echo "::debug:: Executing command: ${OPERATION}"

# cast INPUT_TARGET string to "array"
# shellcheck disable=SC2206
TARGETS=(${INPUT_TARGET})

# iterate over target(s)
for TARGET in "${TARGETS[@]}"; do
  echo "::debug:: Processing target ${TARGET}"

  # shellcheck disable=SC2086
  ${OPERATION} "${TARGET}"
done
