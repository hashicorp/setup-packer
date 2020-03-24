#!/bin/sh -l

env

echo packer \
  "${INPUT_COMMAND}" \
  "${INPUT_ARGUMENTS}" \
  "${INPUT_TARGET}"
