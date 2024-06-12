const express = require("express");
const loginUser = require("../controllers/User.js");
const uploadFile = require("../controllers/UploadedFiles.js");
const authenticateToken = require("../middleware/middleware.js");
const [authenticateUser, refreshToken] = require("../controllers/Auth.js");
const [
  addProject,
  getAllProjects,
  getProjectDetails,
  editProject,
] = require("../controllers/Project.js");
const [
  addRule,
  getRulesByProject,
  getRuleDetails,
  editRule,
] = require("../controllers/ProjectRules.js");
const [
  uploadNewFile,
  getFilesByProject,
  getFilesDetails,
  editFile,
] = require("../controllers/ProjectFiles.js");
const [ask, ingest] = require("../controllers/ChatPrompt.js");
const router = express.Router();

//CHATBOT
router.get("/ask", ask);
router.post("/ingest", ingest);

//GET
router.get("/", loginUser);
router.get("/project/:id/details", getProjectDetails);
router.get("/projects", getAllProjects);
router.get("/rules/:project_id", getRulesByProject);
router.get("/files/:project_id", getFilesByProject);
router.get("/rule/:id/details", getRuleDetails);
router.get("/file/:id/details", getFilesDetails);

//POST
router.post("/login", authenticateUser);
router.post("/token", refreshToken);
router.post("/upload", uploadFile);
router.post("/file/add", uploadNewFile);
router.post("/project/add", addProject);
router.post("/rules/add", addRule);

//PUT
router.put("/project/:id/edit", editProject);
router.put("/rule/:id/edit", editRule);
router.put("/file/:id/edit", editFile);

// You can add more routes here...

module.exports = [router];
authenticateUser;
