#!/bin/sh

# fail if INPUT_COMMAND is not set
if [ -z "${INPUT_COMMAND}" ]; then
  echo "Required variable \`command\` is missing"
  exit 1
fi

# assemble operation
if [ -z "${INPUT_ARGUMENTS}" ]; then
  OPERATION="packer ${INPUT_COMMAND} ${INPUT_ARGUMENTS} ${INPUT_TARGET}"
else
  OPERATION="packer ${INPUT_COMMAND} ${INPUT_TARGET}"
fi

echo "::debug:: name=command::${OPERATION}"

# shellcheck disable=SC2086
${OPERATION}
