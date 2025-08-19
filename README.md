# Expense Tracker

**Expense Tracker** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to empower users to manage their personal finances with ease. Users can register, log in, track income and expenses, and monitor their savings through an intuitive interface. The project integrates modern DevOps practices, including Git for version control, Docker for containerization, and Jenkins for automated CI/CD pipelines, ensuring a robust and scalable deployment.

![Expense Tracker Dashboard](images/dashboard.png)

## Project Overview

Expense Tracker is a comprehensive financial management tool built to simplify budgeting and expense tracking. The application leverages the MERN stack for a seamless full-stack experience, with a responsive React frontend, a RESTful API powered by Node.js and Express, and MongoDB for persistent data storage. DevOps practices ensure efficient development and deployment workflows.

Key achievements in this project include:
- Developing a secure user authentication system with JWT.
- Implementing CRUD operations for income and expense tracking.
- Creating a dynamic, responsive UI with React and Redux for state management.
- Containerizing the application with Docker for consistent environments.
- Automating build, test, and deployment processes with Jenkins CI/CD.

## Features

- **User Authentication**: Secure registration and login using JWT-based authentication.
- **Transaction Management**: Add, update, and delete income and expense records with real-time updates.
- **Savings Tracking**: Automatically calculates total savings based on income and expenses.
- **Responsive UI**: Built with React and styled with CSS for a seamless experience across devices.
- **RESTful API**: Efficient backend operations using Node.js, Express, and MongoDB.
- **DevOps Integration**: Git for version control, Docker for containerization, and Jenkins for CI/CD.

![Expense Tracker Income Page](images/income.png)

## Tech Stack

- **Frontend**: 
  - React.js: Dynamic and responsive user interface.
  - Axios: HTTP client for API requests.
  - Redux: State management for complex UI interactions.
- **Backend**: 
  - Node.js: Server-side runtime environment.
  - Express.js: Framework for building RESTful APIs.
  - MongoDB/Mongoose: NoSQL database for data persistence.
- **DevOps/Deployment**:
  - Git: Version control for collaborative development.
  - Docker: Containerization for consistent environments.
  - Jenkins: Automated CI/CD pipelines for testing and deployment.

## Installation

### Prerequisites
- Node.js and npm (v16 or higher recommended)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Docker (optional, for containerized deployment)
- Jenkins (optional, for CI/CD setup)
- Git

### Clone the Repository
bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

Backend Setup

Navigate to the backend directory:cd backend


Install dependencies:npm install


Create a .env file in the backend directory with the following:MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Replace your_mongodb_connection_string with your MongoDB URI (e.g., from MongoDB Atlas).
Use a secure JWT_SECRET for authentication.


Start the backend server:npm run dev



Frontend Setup

Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Start the frontend development server:npm start

The frontend runs on http://localhost:3000 and communicates with the backend at http://localhost:5000.


Usage

Open your browser and navigate to http://localhost:3000.
Register a new account or log in with existing credentials.
Add income and expense entries to track your finances.
View your total savings and detailed expense breakdown on the dashboard.

DevOps Integration

Git: Version control to manage code changes and collaboration.
Repository: https://github.com/your-username/expense-tracker


Docker: Containerizes the application for consistent deployment across environments.docker build -t expense-tracker .
docker run -p 5000:5000 expense-tracker


Jenkins CI/CD: Automates the build, test, and deployment process.
Configured to run unit tests and deploy updates on code pushes.




Folder Structure
expense-tracker/
├── backend/                  # Node.js + Express API
│   ├── models/               # Mongoose schemas (User, Transaction)
│   ├── routes/               # API routes (auth, transactions)
│   ├── controllers/          # Business logic for API endpoints
│   └── server.js             # Backend entry point
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components (Home, Login, etc.)
│   │   ├── redux/            # State management with Redux
│   │   └── App.js            # Frontend entry point
├── docker-compose.yml        # Multi-container Docker configuration
├── Dockerfile                # Docker configuration for the app
└── README.md                 # Project documentation

Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the repository.
Create a new branch:git checkout -b feature/your-feature-name


Make your changes and commit:git commit -m "Add your feature description"


Push to your branch:git push origin feature/your-feature-name


Open a Pull Request on GitHub.

Please ensure your code follows the project’s coding standards and includes tests where applicable.
Screenshots

Dashboard: Overview of financial status.
Income Page: Add and manage income entries.
Expenses Page: Track and categorize expenses.
Savings Overview: Visualize savings progress.
Docker Execution: Containerized deployment.

Languages

JavaScript: 86.7% (Core logic for frontend and backend)
CSS: 11.1% (Styling for responsive UI)
HTML: 2.2% (Structural markup)

Resources

MongoDB Documentation
React Documentation
Node.js Documentation
Docker Documentation
Jenkins Documentation

License
This project is licensed under the MIT License.
Contact
For questions or feedback, reach out via GitHub Issues or contact the maintainer at [your-email@example.com].

⭐️ Star this repository if you find it useful!🚀 Contribute to make Expense Tracker even better!```
