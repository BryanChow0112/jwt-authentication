equire("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

// In-memory storage for refresh tokens. In a production app, use a database to store these!
let refreshTokens = [];

// Route for generating a new access token using a refresh token.
app.post("/token", (req, res) => {
  // Get the refresh token from the request body.
  const refreshToken = req.body.token;
  // If no refresh token is provided, return 401 Unauthorized.
  if (refreshToken == null) return res.sendStatus(401);
  // If the refresh token is not in our list (invalid or already used/revoked), return 403 Forbidden.
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  // Verify the refresh token's validity using the refresh token secret.
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    // If refresh token verification fails (invalid, expired, tampered), return 403 Forbidden.
    if (err) return res.sendStatus(403);

    // If refresh token is valid, generate a new access token.
    const accessToken = generateAccessToken({ name: user.name }); // Create a new access token with the user's name from the refresh token payload.
    // Send the newly generated access token in the response.
    res.json({ accessToken: accessToken });
  });
});

// Route for logging out a user (invalidating their refresh token).
app.delete("/logout", (req, res) => {
  // Remove the provided refresh token from the `refreshTokens` array.
  // This effectively invalidates the refresh token, so it cannot be used again to get new access tokens.
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204); // Send 204 No Content status, indicating successful logout (no response body needed).
});

// Route for user login
app.post("/login", (req, res) => {
  // **In a real application, you would authenticate the user here (e.g., check username/password against a database).**
  // This example skips actual authentication for simplicity.

  const username = req.body.username; // Get the username from the request body.
  const user = { name: username }; // Create a user object (in real app, user data would come from database).

  // Generate an access token for the user. Access tokens are short-lived and used for authorization.
  const accessToken = generateAccessToken(user);
  // Generate a refresh token for the user. Refresh tokens are long-lived and used to get new access tokens.
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

  // Store the refresh token in our list of valid refresh tokens.
  refreshTokens.push(refreshToken);

  // Send both the access token and refresh token in the response to the client.
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

// Function to generate a new access token.
// Access tokens are short-lived and should be used for API requests.
function generateAccessToken(user) {
  // Sign the user object to create an access token.
  // - `user`:  The payload to include in the access token (e.g., user information).
  // - `process.env.ACCESS_TOKEN_SECRET`: The secret key to sign the access token (must be kept secret!).
  // - `{ expiresIn: "15s" }`:  Options for the token, here setting it to expire in 15 seconds (very short for demonstration!).
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

app.listen(4000, () => {
  console.log("Auth server running on port 4000");
});
