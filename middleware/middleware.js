require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserModel = require("../models/User.js");
app.use(express.json());

const authenticateToken = (req, res, next) => {
  console.log("middle weare called");
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];

  //   if (token == null) return res.sendStatus(401);

  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //     if (err) return res.sendStatus(403);
  //     req.user = user;
  //     next();
  //   });
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token" });
      }
      req.user = decoded; // Attach decoded user information to the request object
      next();
    });
  } else {
    res
      .status(401)
      .json({ message: "Authorization header missing or invalid" });
  }
};

module.exports = [authenticateToken];
