#!/bin/sh -l

env

packer \
  "${INPUT_COMMAND}" \
  "${INPUT_ARGUMENTS}" \
  "${INPUT_TARGET}"
