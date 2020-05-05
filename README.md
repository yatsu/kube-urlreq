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

Open alice's forwarded URL `http://127.0.0.1:8080` and check the access to bob's URL `http://urlreq.bob.svc.cluster.local:3000/` If it is allowed, the result is going to be `200 OK`.

Uninstall kube-urlreq from each Namespace.

```sh
$ NAMESPACE=alice yarn helm:uninstall
$ NAMESPACE=bob yarn helm:uninstall
```

## NetworkPolicy Examples

There are some NetworkPolicy examples for Cilium in `./cilium` directory.

If you Kubernetes cluster is integrated with Cilium, you can block ingress from other namespaces as follows.

```sh
$ sed 's|{{ NAMESPACE }}|bob|g' < cilium/ingress-within-namespace.yaml | kubectl apply -n bob -f -
```

Now the example of the above section fails.

```
400 Bad Request
Timeout
```

See [Kubernetes Network Policies Using Cilium - Controlling Ingress/Egress from Namespaces — Cilium](https://cilium.io/blog/2018/09/19/kubernetes-network-policies/).

You can test this easily with [Managed Kubernetes on DigitalOcean](https://www.digitalocean.com/products/kubernetes/).

## Development Tips

To access the dev-server from another machine as `http://192.168.10.8`, set the environment variables as follows:

```sh
$ HOST="192.168.10.8" CLIENT_PUBLIC_PATH="http://192.168.10.8:3001/" yarn start
```

The web app is built upon [Razzle with-typescript](https://github.com/jaredpalmer/razzle/tree/master/examples/with-typescript). [README-razzle.md](./README-razzle.md) is the generated README.
