#!/bin/sh

echo "Hello, $INPUT_NAME"

echo "time=$(date)" >>"$GITHUB_OUTPUT"
