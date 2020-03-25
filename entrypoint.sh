#!/bin/sh

# fail if INPUT_COMMAND is not set
if [ -z "${INPUT_COMMAND}" ]; then
  echo "Required variable \`command\` is missing"
  exit 1
fi

# assemble operation
if [ -z "${INPUT_ARGUMENTS}" ]; then
  OPERATION="packer ${INPUT_COMMAND} ${INPUT_ARGUMENTS}"
else
  OPERATION="packer ${INPUT_COMMAND}"
fi

echo "::debug:: Executing command: ${OPERATION}"

for TARGET in "${INPUT_TARGET[@]}"; do
  echo "::debug:: Processing target ${TARGET}"

  # shellcheck disable=SC2086
  ${OPERATION} ${TARGET}
done
