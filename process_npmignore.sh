#!/usr/bin/env bash

# Get script location, resolve if a link.
export SCRIPT_ROOT_ENV_SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SCRIPT_ROOT_ENV_SOURCE" ]; do
  export SCRIPT_ROOT_DIR="$( cd -P "$( dirname "$SCRIPT_ROOT_ENV_SOURCE" )" && pwd )"
  export SCRIPT_ROOT_ENV_SOURCE="$(readlink "$SCRIPT_ROOT_ENV_SOURCE")"
  [[ ${SCRIPT_ROOT_ENV_SOURCE} != /* ]] && SCRIPT_ROOT_ENV_SOURCE="$SCRIPT_ROOT_DIR/$SCRIPT_ROOT_ENV_SOURCE"
done
export SCRIPT_ROOT_DIR="$( cd -P "$( dirname "$SCRIPT_ROOT_ENV_SOURCE" )" && pwd )"

pushd "$SCRIPT_ROOT_DIR"

cat base.npmignore > .npmignore
cat .gitignore >> .npmignore

popd
