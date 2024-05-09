require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserModel = require("../models/User.js");
app.use(express.json());

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

const refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user.name });
    res.json({ accessToken: accessToken });
  });
};

const authenticateUser = async (req, res) => {
  try {
    const result = await UserModel.findOne({
      where: { username: req.body.username, password: req.body.password },
    });
    console.log(result);
    if (result) {
      const user = { username: result.username };
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      res.json({
        code: 200,
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "User logged in successfully",
      });
    } else {
      res.json({
        code: 400,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

module.exports = [authenticateUser, refreshToken];
