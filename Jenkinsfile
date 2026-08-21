pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Verify Project') {
            steps {
                echo 'Verifying project files...'
                bat 'dir'
                bat 'docker compose config'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                bat 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Starting Release Orchestrator application...'
                bat 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running containers...'
                bat 'docker compose ps'
            }
        }
    }

    post {
        success {
            echo 'Release Orchestrator deployment completed successfully!'
        }

        failure {
            echo 'Release Orchestrator deployment failed.'
        }
    }
}