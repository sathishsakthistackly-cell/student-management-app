
pipeline {
    agent any

    environment {
        IMAGE_BACKEND = "student-management-app-backend:latest"
        IMAGE_FRONTEND = "student-management-app-frontend:latest"
    }

    stages {

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t student-management-app-backend:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t student-management-app-frontend:latest ./frontend'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
