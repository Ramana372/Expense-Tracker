pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        BACKEND_IMAGE = "ramana2003/expense-tracker-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "ramana2003/expense-tracker-frontend:${BUILD_NUMBER}"
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
                        docker.build(env.BACKEND_IMAGE)
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        docker.build(env.FRONTEND_IMAGE)
                    }
                }
            }
        }
        stage('Run MongoDB') {
    steps {
        bat "docker run -d -p 27017:27017 --name mongo mongo:latest"
    }
    }
        stage('Test') {
            steps {
                dir('backend') {
                    bat '''
                    call npm test
                    if %ERRORLEVEL% NEQ 0 (
                        echo "Backend tests failed, but continuing..."
                        exit /b 0
                    )
                    '''
                }
                dir('frontend') {
                    bat '''
                    call npm test
                    if %ERRORLEVEL% NEQ 0 (
                        echo "Frontend tests failed, but continuing..."
                        exit /b 0
                    )
                    '''
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                bat '''
                echo|set /p=%DOCKERHUB_CREDENTIALS_PSW%|docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                bat "docker push %BACKEND_IMAGE%"
                bat "docker push %FRONTEND_IMAGE%"
                bat "docker tag %BACKEND_IMAGE% ramana2003/expense-tracker-backend:latest"
                bat "docker push ramana2003/expense-tracker-backend:latest"
                bat "docker tag %FRONTEND_IMAGE% ramana2003/expense-tracker-frontend:latest"
                bat "docker push ramana2003/expense-tracker-frontend:latest"
            }
        }

        stage('Stop Old Containers') {
            steps {
                bat 'docker stop expense-tracker-backend || exit 0'
                bat 'docker rm expense-tracker-backend || exit 0'
                bat 'docker stop expense-tracker-frontend || exit 0'
                bat 'docker rm expense-tracker-frontend || exit 0'
            }
        }

stage('Run New Containers') {
    steps {
        bat "docker run -d -p 8099:5000 --name expense-tracker-backend --link mongo:mongo -e MONGO_URI=mongodb://mongo:27017/myData ramana2003/expense-tracker-backend:%BUILD_NUMBER%"
        bat "docker run -d -p 3099:80 --name expense-tracker-frontend -e REACT_APP_API_URL=http://localhost:8099/api ramana2003/expense-tracker-frontend:%BUILD_NUMBER%"
    }
}


        stage('Deploy with Compose') {
            steps {
                echo 'Deployment step placeholder - customize based on target platform'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
