#!/usr/bin/env bash

# Only set the git hooks path if CI environment variable isn't set,
# since `git` might not be installed in the GitHub Actions Runner
# machine, and git hooks aren't needed in the pipeline anyways

if [ -z "$CI" ] || [ "$CI" = "false" ]; then
    git config core.hooksPath .githooks
fi