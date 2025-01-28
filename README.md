# Exploring JWT Authentication

This repository documents my learning journey into JWT (JSON Web Token) authentication. JWT is a popular method for securely handling user authentication and authorization in web applications and APIs.  I wanted to understand how JWTs work in practice, so I created this project to experiment with building a basic JWT authentication system.


## Badges

![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)


## Authentication vs. Authorization:

It's important to distinguish between **authentication** and **authorization**:

*   **Authentication (Who are you?):**  This is the process of verifying a user's identity.  It's about confirming *who* someone is.  Think of it like showing your ID to get into a building.  JWTs are often used to maintain authentication state after a user has logged in.
*   **Authorization (Are you allowed to do this?):** This is the process of determining if an authenticated user has permission to access a specific resource or perform a particular action. It's about checking *what* someone is allowed to do.  Think of it like having a keycard that only grants you access to certain floors of the building.  JWTs can also carry information about user roles and permissions for authorization purposes.


## JWT Authentication Example Code

This repository contains two main JavaScript files demonstrating a basic JWT authentication flow:

*   **`server.js`**: This file shows how to protect API routes using JWT access tokens. It includes middleware (`authenticateToken`) that verifies the access token sent in the `Authorization` header of requests. Only requests with valid access tokens can access the `/posts` route.
      - This file focuses on **authorization** - ensuring only authenticated users with valid tokens can access protected resources.

*   **`authServer.js`**: This file handles user login and token management. It demonstrates:
    *   **Login (`/login` route):**  Simulates user login (basic username) and generates both an access token (short-lived) and a refresh token (longer-lived).
    *   **Token Refresh (`/token` route):**  Shows how to use a refresh token to obtain a new access token when the access token expires, without requiring the user to log in again.
    *   **Logout (`/logout` route):**  Demonstrates how to invalidate refresh tokens upon user logout.
    *   This file focuses on **authentication** and token lifecycle management, including issuing and refreshing tokens.
