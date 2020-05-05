#!/bin/bash -eu

docker build -t yatsu/kube-urlreq:0.1.0 .
docker tag yatsu/kube-urlreq:0.1.0 yatsu/kube-urlreq:latest
