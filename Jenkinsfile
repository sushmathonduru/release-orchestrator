pipeline {
    agent any

    stages {

        stage('Verify Project') {
            steps {
                echo 'Verifying project files...'
                sh 'pwd'
                sh 'ls -la'
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying Release Orchestrator...'
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running containers...'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'Release Orchestrator deployment successful!'
        }

        failure {
            echo 'Release Orchestrator deployment failed.'
        }
    }
}