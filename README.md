# Kubernetes HW

Hello world deployment/svc/config/ingress for full-stack TS/JS applications with oauth2 proxy

# Index

- [Getting Started](#getting-started)
  - [Dependencies](#install-dependencies)
  - [Env Vars](#env-vars)
- [Running The Project](#running-the-project)
- [Deploying The Project](#deploying-the-project)
  - [Minikube](#minikube)
  - [Azure](#azure)

# Getting Started

#### You will need the following already installed:

- docker
- node
- kubectl cli
- az cli
- minikuibe (optional)
- hyperkit (optional)

#### Install dependencies

```bash
brew update && brew install azure-cli
```

```bash
cd api && npm i
```

```bash
cd client && npm ci
```

#### Env Vars

Add the proper .env variables to a .env file (see .env.example)

- PROJECT=<whatever you want>
- REPO=<name of docker repo you will push your image to>
- CLIENT_ID=<client id for oauth2 provider>
- CLIENT_SECRET=<client secret for oauth2 provider>
- COOKIE_SECRET=<generated 32 byte cookie>
- DB_PASSWORD=<whatever postgres password you choose>
- DB_NAME=<whatever postgres db name you choose>
- DB_USER=<whatever postgres username you choose>
- NAMEPSACE=<your name>

To generate a cookie secret:

```bash

python3 -c 'import os,base64; print(base64.urlsafe_b64encode(os.urandom(32)).decode())'

```

To get the client_id and client_secret:

(I am using github)

- <a href="github.com/settings/developers">Github Provider</a>
  - click "new oauth project"
  - set the name to whatever you want
  - set the project homepage to your url (
  - ie: local: `http://localhost:4180`
  - ie: cloud-provider: `http://<your endpoint>`
  - ie: minikube: `http://<minikubeip>`
    - see notes on minikube below

# Running the Project

## Deploy To AZ

### Automated Deployment

Ensure you have the following secrets:

`KUBE_CONFIG`

Assuming you have set the aks credentials locally, as well as the context for your namespace, go to the root dir and `pbcopy < ~/.kube/config`

`ACR_PASSWORD`

You can find this in the azure container regitsry

Create a PR and point it to "deploy". This should build the changes and deploy to azure.

### Manual Deployment

```bash
docker-compose up -d --build
```

```bash
az login
```

```bash
az aks get-credentials
```

```bash
az acr login --name <acrName>
```

```bash
make docker-push-prod
```

```bash
kubectl create namespace <namespace>
```

```bash
kubectl config set-context --current --namespace=<insert-namespace-name-here>
```

```bash
kubectl create secret generic oauthproxy-secret \ --from-literal=client_id=<client_id> --from-literal=client-secret=<client_secret> --from-literal=cookie-secret=<cookie_secret>
```

```bash
kubectl create secret generic db-secret \ --from-literal=password=<db_password>
```

```bash
kubectl apply -f k8s
```

## Locally

#### Minikube

- ensure minikube is installed
- otherwise `brew install minikube`
- you will need to run minikube with hyperkit to expose the url

```bash
minikube start --driver=hyperkit
```

```bash
kubectl apply -f ./k8s
```

**_note:_** hyperdriver will not run on m1 chip macs, skip ingress for minikube in this case

```bash
minikube addons enable ingress
```

```bash
minikube addons enable ingress-dns
```

- run `minikube ip`
- copy the output to your provider set up as the homepage/redirect

or

```bash
minikube service oauth2-proxy -n <namespace> --url
```

- copy the output to your provider set up as the homepage/redirect

#### Docker

- Copy the env.example files and fill in the correct values.
- Make sure that iun your make file you are pointing to the correct env file

`make run-local`

#### Kubectl Commands

Create and set namespace:

- kubectl create namespace <namespace>
- kubectl config set-context --current --namespace=<insert-namespace-name-here>
  Create secrets:
- kubectl create secret generic oauthproxy-secret \ --from-literal=client_id=<client_id> --from-literal=client-secret=<client_secret> --from-literal=cookie-secret=<cookie_secret>
- kubectl create secret generic db-secret \ --from-literal=password=<db_password>
