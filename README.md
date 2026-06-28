# PawTopia

PawTopia is a web application designed for pet care, premium essentials shopping, and pet adoption services.

The codebase is split into separate **Frontend** and **Backend** directories, using **MongoDB** as the database.

---

## Repository Structure

```
ani-shopee-main/
├── backend/                # Node.js + Express API server
│   ├── models/            # Mongoose schemas (User, Contact)
│   ├── routes/            # Express routes (auth, contact)
│   ├── server.js          # Entry point for backend
│   └── package.json       # Backend dependencies
├── frontend/               # React client application
│   ├── public/            # Public assets (HTML, favicon)
│   ├── src/               # React components, styles, and logic
│   └── package.json       # Frontend configurations
├── start_dev.bat          # Unified startup script (Windows)
├── start_server.bat       # Wrapper for start_dev.bat
└── README.md              # Project documentation
```

---

## Tech Stack

* **Frontend**: React (JS/JSX), React Router DOM, Custom Vanilla CSS
* **Backend**: Node.js, Express, Mongoose (MongoDB ODM)
* **Authentication**: Hashed passwords with `bcryptjs`, session handling via JSON Web Tokens (`jsonwebtoken`)

---

## Prerequisites

1. Install **Node.js** (v16+)
2. Install and run **MongoDB** locally (defaulting to `mongodb://127.0.0.1:27017/pawtopia`)

---

## Quick Start (Concurrent Development Setup)

To launch both the backend server and the frontend client concurrently, double-click or run the startup batch file from the root folder:

```bash
# On Windows Command Prompt or PowerShell:
./start_dev.bat
```

This script automatically:
* Spawns a terminal running the Express backend on `http://localhost:5000`
* Spawns another terminal running the React frontend on `http://localhost:3000/pawtopia`

---

## Running Manually

If you prefer starting them individually, use these commands:

### 1. Run Backend Server
```bash
cd backend
npm install
npm run dev
```

The server uses `nodemon` which watches files and restarts on changes. It will log `MongoDB Connected Successfully`.

### 2. Run Frontend Server
```bash
cd frontend
npm install
npm start
```

---

## Backend API Endpoints

### 1. Authentication

* **Sign Up User**
  * **URL**: `POST /api/auth/signup`
  * **Payload**:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```

* **Sign In User**
  * **URL**: `POST /api/auth/signin`
  * **Payload**:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  * **Response**: Returns a JSON Web Token (JWT) and user data.

* **Retrieve Registered Users & Count**
  * **URL**: `GET /api/auth/users`
  * **Response**: Returns a list of users (excluding passwords) and count.

### 2. Contact Queries

* **Submit Contact Message**
  * **URL**: `POST /api/contact`
  * **Payload**:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phoneNumber": "1234567890",
      "message": "Interested in adopting a rescue dog!"
    }
    ```

* **Retrieve Submitted Messages**
  * **URL**: `GET /api/contact`
  * **Response**: Returns a count and list of submitted query messages.
