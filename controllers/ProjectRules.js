const ProjectRulesModel = require("../models/ProjectRules.js");

const addRule = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await ProjectRulesModel.create({
      name: req.body.name,
      content: req.body.content,
      project_id: req.body.project_id,
      type: parseInt(req.body.type),
      user_id: 1,
    });
    if (result) {
      res.json({
        code: 200,
        message: "Rules added successufully",
      });
    } else {
      res.json({
        code: 400,
        message: "Something want wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};

const getRulesByProject = async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    const result = await ProjectRulesModel.findAll({
      where: { project_id: project_id },
    });
    if (result) {
      return res
        .status(200)
        .json({ code: 200, count: result.length, result: result });
    } else {
      return res.status(404).json({
        code: 404,
        message: "No data available.",
      });
    }
  } catch (error) {
    return res.status(500).json({ code: 500, message: error });
  }
};

const getRuleDetails = async (req, res, next) => {
  try {
    const rule_id = req.params.id;
    const result = await ProjectRulesModel.findOne({
      where: { id: rule_id },
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

const editRule = async (req, res) => {
  try {
    const result = await ProjectRulesModel.update(req.body, {
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

module.exports = [addRule, getRulesByProject, getRuleDetails, editRule];
