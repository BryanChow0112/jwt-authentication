require("dotenv").config();
const express = require("express");
const app = express();

const posts = [
  { username: "Bryan", title: "Post 1" },
  { username: "John", title: "Post 2" },
  { username: "Edward", title: "Post 3" }
];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
