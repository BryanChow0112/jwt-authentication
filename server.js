require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

// Sample data - In a real application, this would likely come from a database.
const posts = [
  { username: "Bryan", title: "Post 1" },
  { username: "John", title: "Post 2" },
  { username: "Edward", title: "Post 3" }
];

// GET /posts - Protected route, requires JWT authentication.
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// Authenticate JWT token from Authorization header.
function authenticateToken(req, res, next) {
  // Get Authorization header from request
  const authHeader = req.headers["authorization"];
  // JWTs are typically sent in the 'Authorization' header as a Bearer token: "Bearer <token>".
  const token = authHeader && authHeader.split(" ")[1];

  // No token in header, send 401 (Unauthorized).
  if (token == null) return res.sendStatus(401);

  // Verify the extracted JWT.
  // - `token`: The JWT string to be verified.
  // - `process.env.ACCESS_TOKEN_SECRET`:  The secret key used to sign the JWT (must match for verification).
  // - Callback function: handles the verification result (error or decoded user data).
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token, send 403 (Forbidden).

    req.user = user; // Store user data from token in req.user.
    next();
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
