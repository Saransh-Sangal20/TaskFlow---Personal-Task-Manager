# TaskFlow – Task Management Web Application

A simple full-stack Task Management web application built as part of the **Full Stack Development Internship – Skill Assessment Assignment**.

---

## 🚀 Features

- User authentication (Signup / Login / Logout)
- Create, view, update, and delete tasks
- Task status management:
  - Pending
  - In Progress
  - Completed
- Tasks are separated based on their status
- Each user can manage only their own tasks
- Responsive UI using Bootstrap

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS (Embedded JavaScript Templates)
- Bootstrap

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- MongoDB
- Mongoose

---

## ⚙️ Setup Instructions

Follow the steps below to run the project locally:

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-link>

2. **Navigate to the project directory**
   ```bash
   cd TaskFlow

3. **Install dependencies**
    ```bash
    npm install

4. **Create a .env file in the root directory**
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key

5. **Install Nodemon (if not installed)**
    ```bash
    npm i nodemon

6. **Start the server**
    ```bash
    nodemon index.js

7. **Open the application in your browser**
    ```bash
    http://localhost:8080/login

---

**Dummy Login Credentials**
  ```bash
  username: admin_123
  email: admin@gmail.com
  password: admin123

**(The above dummy credentials can be logged in to display dummy tasks for website demo)**


## 🧪 Testing

The application has been manually tested to ensure:

- User signup, login, and logout work correctly
- Invalid login credentials are handled properly
- Users can create, update, and delete tasks
- Tasks are separated based on their status
- Users can access only their own tasks
- Application works correctly on different screen sizes
