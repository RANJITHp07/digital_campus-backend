## Digital Campus - Learning Management System

### Overview
![image](https://github.com/RANJITHp07/digital_campus-backend/assets/107017062/c27e3830-b93e-43c8-aa45-e0c8d2b00fd2)


Digital Campus is a feature-rich Learning Management System (LMS) designed for modern educational needs. It's built using a clean architecture, microservices, and cutting-edge technologies to provide a scalable, secure, and efficient platform for managing educational content and interactions.

### Technologies Used

- Node.js
- Express
- Redis
- Express
- PostgreSQL
- MongoDB
- Microservices Architecture
- GraphQL
- Docker
- Kubernetes
- Clean Architecture
- Typescript

### Services

1. **Auth Service:**
   - Responsible for user authentication and authorization.

2. **Classroom Service:**
   - Manages the creation, organization, and access to virtual classrooms.

3. **Assignment Service:**
   - Handles the creation, submission, and evaluation of assignments.

4. **Submission Service:**
   - Manages student submissions and grading.

5. **Payment Service:**
   - Integrates Razorpay for subscription-based payment methods.

6. **Chat Service:**
   - Implements real-time chat functionality using Socket.io.

7. **Notification Service:**
   - Handles notifications and communication within the platform.

### Clean Architecture

The project follows a clean architecture design pattern to ensure separation of concerns, maintainability, and testability.

### Docker and Kubernetes

The entire system is dockerized for easy deployment and scalability. Kubernetes is used for orchestrating the containerized services.

### CI/CD Pipeline

Continuous Integration (CI) and Continuous Deployment (CD) pipelines have been set up to automate the testing and deployment processes, ensuring a reliable and efficient development workflow.

### Git Commit Linting

Git commit linting is enforced to maintain a consistent and readable commit history, making collaboration and code maintenance smoother.

### Third-Party Integrations

- Razorpay: Integrated for subscription-based payment management.

### Getting Started

1. **Prerequisites:**
   - Node.js and npm installed
   - Docker and Docker Compose installed
   - Kubernetes cluster set up

2. **Installation:**
   ```bash
   # Clone the repository
   git clone https://github.com/your-username/digital-campus.git

   # Navigate to the project directory
   cd digital-campus

   # Install dependencies
   npm install
   ```

3. **Usage:**
   - Follow the instructions in each service's README for specific usage details.

### Contribution Guidelines

If you would like to contribute to Digital Campus, please follow our [Contribution Guidelines](CONTRIBUTING.md).

### License

This project is licensed under the [MIT License](LICENSE).

Feel free to customize the README to suit your specific project details and structure. Providing clear and concise information will greatly benefit users and potential contributors.
