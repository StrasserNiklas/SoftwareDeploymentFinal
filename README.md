az login
az aks create -g SoftwareDeploymentFinal -n aksFinal --node-count 1

### Container registry

az acr create -g SoftwareDeploymentFinal -n SoftwareDeploymentRegistry --sku basic