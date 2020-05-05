#!/bin/bash -eu

NAMESPACE=${NAMESPACE:-default}

helm uninstall -n "${NAMESPACE}" urlreq
