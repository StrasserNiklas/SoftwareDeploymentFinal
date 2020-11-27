
az login
az aks create -g SoftwareDeploymentFinal -n aksFinal --node-count 1

### Container registry

az acr create -g SoftwareDeploymentFinal -n SoftwareDeploymentRegistry --sku basic

# SoftwareDeploymentFinal

https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/kubernetes/aks-template?view=azure-devops

https://www.clouddev.engineering/deploying-a-container-in-an-azure-devops-pipeline/




