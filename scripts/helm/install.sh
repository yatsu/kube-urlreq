#!/bin/bash -eu

NAMESPACE=${NAMESPACE:-default}

helm install -n "${NAMESPACE}" urlreq ./helm
