#!/bin/bash -eu

NAMESPACE=${NAMESPACE:-default}
PORT=${PORT:-8080}

pod_name=$(kubectl get pods --namespace "${NAMESPACE}" -l "app.kubernetes.io/name=urlreq,app.kubernetes.io/instance=urlreq" -o jsonpath="{.items[0].metadata.name}")

kubectl --namespace "${NAMESPACE}" port-forward --address 0.0.0.0 "${pod_name}" "${PORT}:3000"

echo "Visit http://127.0.0.1:${PORT}/"
