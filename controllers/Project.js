const ProjectsModel = require("../models/Projects.js");

const addProject = async (req, res, next) => {
  try {
    const result = await ProjectsModel.create({
      name: req.body.name,
      description: req.body.description,
      user_id: 1,
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

const getAllProjects = async (req, res, next) => {
  try {
    const result = await ProjectsModel.findAll();
    if (result) {
      return res.status(200).json({ code: 200, result: result });
    } else {
      return res.status(404).json({
        code: 404,
        message: "No data available.",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 404, message: "Internal server error" });
  }
};

const getProjectDetails = async (req, res, next) => {
  try {
    const project_id = req.params.id;
    const result = await ProjectsModel.findOne({
      where: { id: project_id },
    });
    if (result) {
      return res.status(200).json({ code: 200, result: result });
    } else {
      return res.status(404).json({
        code: 404,
        message: "No data available.",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 404, message: "Internal server error" });
  }
};

const editProject = async (req, res) => {
  try {
    const result = await ProjectsModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (result) {
      return res
        .status(200)
        .json({ code: 200, message: "Update successfully." });
    } else {
      return res.status(404).json({
        code: 404,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = [addProject, getAllProjects, getProjectDetails, editProject];
