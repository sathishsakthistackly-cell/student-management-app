pipeline {
    agent any

    environment {
        IMAGE_BACKEND = "student-backend"
        IMAGE_FRONTEND = "student-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/YOUR_REPO/student-management-app.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_BACKEND ./backend"
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_FRONTEND ./frontend"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "kubectl apply -f kubernetes/"
                }
            }
        }
    }
}