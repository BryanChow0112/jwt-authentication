require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const posts = [
  { username: "Bryan", title: "Post 1" },
  { username: "John", title: "Post 2" },
  { username: "Edward", title: "Post 3" }
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
