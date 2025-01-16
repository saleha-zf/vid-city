
# Vid-City Kubernetes Deployment

This project demonstrates how to deploy and manage the Vid-City application on a Kubernetes cluster on Google Cloud. It provides instructions for setting up necessary APIs, creating a cluster, configuring the ingress controller, and deploying the application using Skaffold.

![Homepage](frontend/frontend/public/Homepage%20screenshot.png)



## Prerequisites

Before starting, ensure you have the following installed:

- **Google Cloud SDK**: [Installation Guide](https://cloud.google.com/sdk/docs/install)
- **kubectl**: [Installation Guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- **Skaffold**: [Installation Guide](https://skaffold.dev/docs/install/)

Also, ensure your Google Cloud account is properly set up with the necessary permissions.

## Enabling Required APIs

You need to enable the following Google Cloud APIs for this project:

1. **Google Kubernetes Engine API**: Used to manage Kubernetes clusters.
2. **Cloud Monitoring API**: Used for monitoring the health and performance of your Kubernetes resources.
3. **Cloud Logging API**: Used for aggregating and displaying logs from your Kubernetes clusters.
4. **Compute Engine API**: required for creating and managing virtual machines (VMs) that form the nodes of your GKE cluster.

You can enable these APIs using the Google Cloud Console or the following command:

```bash
gcloud services enable \
  container.googleapis.com \
  monitoring.googleapis.com \
  logging.googleapis.com \
  compute.googleapis.com \
  cloudbuild.googleapis.com
```

## Creating the Kubernetes Cluster

To minimize resource consumption, we will create a minimal Kubernetes cluster called `vid-city-cluster` with 1-3 nodes. You can create the cluster with the following command:

```bash
gcloud container clusters create vid-city-cluster \
  --zone=us-central1-a \
  --num-nodes=1 \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=3
```

This will create a Kubernetes cluster with a minimal number of nodes, which will automatically scale within the defined range.

## Getting Credentials for the Cluster

After creating the cluster, retrieve the credentials needed for kubectl to interact with the cluster:

```bash
gcloud container clusters get-credentials vid-city-cluster --zone us-central1-a
```

## Configuring the Project ID in Skaffold

Make sure to replace the project ID in the `skaffold.yaml` file to your actual Google Cloud project ID.

1. Open `node/skaffold.yaml`.
2. Find the line that specifies the project ID and change it to your own project ID.

For example:

```yaml
apiVersion: skaffold/v2beta21
kind: Config
metadata:
  name: vid-city
build:
  artifacts:
    - image: gcr.io/YOUR_PROJECT_ID/vid-city
```

Replace `YOUR_PROJECT_ID` with your actual project ID.

## Setting Up the Ingress Controller

To expose the Vid-City application on the web, you need to set up an ingress controller. We will use the NGINX ingress controller for this purpose. Deploy it using the following command:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

This will install the NGINX ingress controller on your cluster.

## Deploying the Application with Skaffold

Once the cluster and ingress controller are set up, use Skaffold to deploy the Vid-City application. Skaffold will build, push, and deploy the application, as well as monitor for any changes to the source code.

Run the following command in the project directory:

```bash
skaffold dev
```

This will:

- Build your Docker images.
- Deploy the application to the Kubernetes cluster.
- Monitor changes to your code and automatically redeploy when needed.

You can monitor the status of your deployment and the application in real-time using this command.

## Accessing the Application

After the application is deployed, the ingress controller will expose it on a public IP. You can check the ingress details with the following command:

```bash
kubectl get ingress
```

This will show you the external IP that you can use to access the Vid-City application.
Now, you need to resolve the IP-address of the ingress controller to a DNS name ("vid-city" in this app).
In Windows, the file is located at:

```bash
C:\Windows\System32\drivers\etc
```
Add the Ingress controller IP Address with the hostname like this: 
- <IP-ADDRESS> <DOMAIN NAME>
- 34.135.180.61 vid-city.com (replace the IP address with your ingress controller IP)
- Now, you can access vid-city.com in your browser!

## Conclusion

You have successfully set up a Kubernetes cluster on Google Cloud, deployed the Vid-City application, and exposed it using the ingress controller. Skaffold will continue to monitor and redeploy the application as you make changes to the code.

### Troubleshooting

- **DNS Resolution Issues**: Ensure your `/etc/hosts` file contains the correct IP mappings, or check your cloud provider's DNS configuration.
- **Ingress Not Working**: Ensure the ingress controller setup command is correct as Ingress has been replaced with gateway API and may be outdated.

---
