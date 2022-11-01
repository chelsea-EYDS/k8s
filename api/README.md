`az login --name <RG NAME>`
`az acr login --name <registeryname>`

#### Add reader scope for Pulling Images:

az ad sp create-for-rbac \
 --scopes /subscriptions/<SUBSCRIPTION_ID>/resourcegroups/<RG_NAME>/providers/Microsoft.ContainerRegistry/registries/<REGISTRY_NAME> \
 --role Reader \
 --name registry
Changing "registry" to a valid URI of "http://registry", which is the required format used for service principal names
Creating a role assignment under the scope of "/subscriptions/<SUBSCRIPTION_ID>/resourcegroups/<RG_NAME>/providers/Microsoft.ContainerRegistry/registries/<REGISTRY_NAME>"
{
"appId": <APPID>,
"displayName": "registry",
"name": "http://registry",
"password": <PASSWORD>,
"tenant": <TENANTID>
}

#### Create Pull secret:

kubectl create secret docker-registry regcred \
 --docker-server <RG_NAME>.azurecr.io \
 --docker-email azure@<RG_NAME>.com \
 --docker-username=<APPID> \
 --docker-password <PASSWORD>
