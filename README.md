# kube-urlreq

kube-urlreq is a web app to check URL access from a Kubernetes Pod.

![kube-urlreq screen](https://github.com/yatsu/kube-urlreq/blob/master/kube-urlreq.png)

## Prerequisites

* Kubernetes Cluster
* Helm v3
* Node.js
* yarn

## Examples

Create Namespace `alice` and `bob`.

```sh
$ kubectl create namespace alice
$ kubectl create namespace bob
```

Install kube-urlreq to each Namespace.

```sh
$ NAMESPACE=alice yarn helm:install
$ NAMESPACE=bob yarn helm:install
```

Forward local ports to each pod.

```sh
$ NAMESPACE=alice PORT=8080 yarn port-forward
$ NAMESPACE=bob PORT=8081 yarn port-forward
```

Open alice's forwarded URL `http://127.0.0.1:8080` and check the access to bob's URL `http://urlreq.alice.svc.cluster.local:3000/` If it is allowed, the result is going to be `200 OK`.

Uninstall kube-urlreq from each Namespace.

```sh
$ NAMESPACE=alice yarn helm:uninstall
$ NAMESPACE=bob yarn helm:uninstall
```

## Development Tips

To access the dev-server from another machine as `http://192.168.10.8`, set the environment variables as follows:

```sh
$ HOST="192.168.10.8" CLIENT_PUBLIC_PATH="http://192.168.10.8:3001/" yarn start
```
