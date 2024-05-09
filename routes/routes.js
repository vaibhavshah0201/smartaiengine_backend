const express = require("express");
const loginUser = require("../controllers/User.js");
const uploadFile = require("../controllers/UploadedFiles.js");
const [authenticateUser, refreshToken] = require("../controllers/Auth.js");

const router = express.Router();

router.get("/", loginUser); // Pass a reference to loginUser function
router.post("/login", authenticateUser); // Pass a reference to authenticateUser function
router.post("/token", refreshToken); // Pass a reference to authenticateUser function
router.post("/upload", uploadFile); // Pass a reference to uploadFile function

// You can add more routes here...

module.exports = [router];
authenticateUser;
