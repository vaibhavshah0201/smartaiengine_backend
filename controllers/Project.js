const ProjectsModel = require("../models/Projects.js");

const addProject = async (req, res, next) => {
  try {
    const result = await ProjectsModel.create({
      name: req.body.name,
    });
    if (result) {
      res.json({
        code: 200,
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

module.exports = [addProject];
