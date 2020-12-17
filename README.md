
# Description

Whenever there is a new checkin in GIT , the Azure DevOps pipeline is triggered and runs the following actions:

    a new docker image of the WebApp is built
    the image is saved in an Azure registry
    the new image is deployed in the AKS cluster and available via a public IP

# Links

Docker image in the registry (name is derived from the (shared) git repo): softwaredeploymentregistry.azurecr.io/strasserniklassoftwaredeploymentfinal

Public AKS endpoint: http://52.142.85.240:8080/

Screenshot Azure DevOps Pipeline incl. successful Deployment: https://github.com/StrasserNiklas/SoftwareDeploymentFinal/blob/main/AzureDevOpsPipeline_Successful_Deployment.PNG

# Setup Cluster and Registry

Login to Azure via the console:

    az login

We created the AKS cluster using the already existing resouce group `SoftwareDeploymentFinal`:

    az aks create -g SoftwareDeploymentFinal -n aksFinal --node-count 1

We created the registry:

    az acr create -g SoftwareDeploymentFinal -n SoftwareDeploymentRegistry --sku basic

# Setup/modify the Webapp from Lab2

Inside the Webapp folder, we added a `Dockerfile` and a `.dockerignore`.

## Dockerfile

Docker image is based on node:

    FROM node:12

Workdirectory is set and after the package.json is copied, the needed dependecies are installed:

    WORKDIR /usr/src/app
    COPY package*.json ./
    RUN npm install

Files are copied, port to be exposed is 8080:

    COPY . .
    EXPOSE 8080

The container will start by running the "start" script, which starts the express server:

    CMD [ "npm", "start" ]

# Build the pipeline

Inside a new project on dev.azure.com (in our case `SoftwareDeploymentFinal`) we created a `New pipeline`.

Next, we added the git repository with the Webapp (containing the Dockerfile), in our case it is https://github.com/StrasserNiklas/SoftwareDeploymentFinal and selected it.

In the `Configure` tab, we selected the `Deploy to Azure Kubernetes Service` option.

We chose the subscription (in our case Azure for Education) and continued.

In the popout `Deploy to Azure Kubernetes Service` we chose `aksFinal` as our cluster, used an existing namespace -> `Default` and chose our `SoftwareDeploymentRegistry` registry.

We then used the default values, for image name `strasserniklassoftwaredeploymentfinal` which is derived from the git repository and as service port `8080` which is taken from the `Dockerfile`. We also checked `Enable Review App flow for Pull Requests`. We did that because for a unknown reason it didn´t work before when we didn´t check it.

After validating and configuring, the pipeline was ready to be run.

## manifests folder

This folder is created when running the pipeline and contains the relevant information for the AKS cluster.
