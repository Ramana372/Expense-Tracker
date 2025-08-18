pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        BACKEND_IMAGE = "ramana2003/expense-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "ramana2003/expense-frontend:${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Ramana372/Expense-Tracker.git', branch: 'main'
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    script {
                        docker.build(BACKEND_IMAGE)
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        docker.build(FRONTEND_IMAGE)
                    }
                }
            }
        }
        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test || true'
                }
                dir('frontend') {
                    sh 'npm test || true'
                }
            }
        }
        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        docker.image(BACKEND_IMAGE).push()
                        docker.image(FRONTEND_IMAGE).push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'TAG=${BUILD_NUMBER} docker-compose -f docker-compose.prod.yml up -d'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}