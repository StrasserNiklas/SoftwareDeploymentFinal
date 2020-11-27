
# Links

Docker image in the registry (name is derived from the (shared) git repo): 

Public AKS endpoint: http://52.142.85.240:8080/

# Setup Cluster and Registry

Login to Azure via the console:

    az login

Create the AKS cluster:

    az aks create -g SoftwareDeploymentFinal -n aksFinal --node-count 1

Create the registry:

    az acr create -g SoftwareDeploymentFinal -n SoftwareDeploymentRegistry --sku basic

# Setup/modify the Webapp from Lab2

Inside the Webapp folder, add a `Dockerfile` and a `.dockerignore`.

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

