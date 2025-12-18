Secure Registration and Team Allocation System (MERN Stack)

I developed a secure registration website using the MERN stack (MongoDB, Express.js, React.js, Node.js) that ensures safe user authentication and automatic, equal team distribution.

Key Features

1) Main Registration Module
Every user must complete a primary registration process before accessing the system.
Automatic Team Assignment
Users are assigned to 13 teams in a round-robin manner.
Assignment follows the sequence Team 1 → Team 13, then restarts from Team 1.
This ensures equal and fair distribution of participants across all teams.

2) Secure Credential Handling
User credentials (such as passwords) are hashed using bcrypt before storage.
Plain-text passwords are never stored or transmitted to the database.
Direct Database Injection with Validation
After hashing and validation, user data is securely stored in MongoDB.
Prevents unauthorized access and reduces the risk of data breaches.

3) Security Implementation
bcrypt hashing with salt for strong password protection
Backend validation using Express.js middleware
Secure API communication between frontend and backend

Technology Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Security: bcrypt for password hashing

Outcome
The system provides a secure, scalable, and efficient registration platform that:
Protects user credentials
Automatically balances team allocation

Is suitable for events, competitions, hackathons, or organizational onboarding

Frontend-env
VITE_API_URL="http://localhost:4000/api"

Backend-env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/bdcnss
JWT_SECRET=supersecretkey

Credentials
ADMIN LOGIN
Username: nssritofficial
Password: nssrit@2025


TEAM LOGINS
TeamA   → main_registration
TeamB1  → token1
TeamB2  → token2
TeamB3  → token3
TeamB4  → token4
TeamB5  → token5
TeamB6  → token6
TeamB7  → token7
TeamB8  → token8
TeamB9  → token9
TeamB10 → token10
TeamB11 → token11
TeamB12 → token12
TeamB13 → token13
