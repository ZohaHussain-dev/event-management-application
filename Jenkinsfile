pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        IMAGE_BACKEND = '<YOUR_DOCKERHUB_USERNAME>/event-backend'
        IMAGE_FRONTEND = '<YOUR_DOCKERHUB_USERNAME>/event-frontend'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ZohaHussain-dev/event-management-application.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    docker.image("${IMAGE_BACKEND}:latest").build("-f backend/Dockerfile ./backend")
                    docker.image("${IMAGE_FRONTEND}:latest").build("-f frontend/event-app-frontend/Dockerfile ./frontend/event-app-frontend")
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${IMAGE_BACKEND}:latest").push()
                        docker.image("${IMAGE_FRONTEND}:latest").push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes (Minikube)') {
            steps {
                sh '''
                    # Ensure kubectl can talk to minikube or apply directly
                    kubectl apply -f k8s/mongo-deployment.yaml
                    kubectl apply -f k8s/backend-deployment.yaml
                    kubectl apply -f k8s/frontend-deployment.yaml
                    kubectl rollout restart deployment/backend
                    kubectl rollout restart deployment/frontend
                '''
            }
        }
    }
}
