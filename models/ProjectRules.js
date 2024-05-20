const db = require("../config/db.js");
const { DataTypes } = require("sequelize");
const ProjectsModel = require("./Projects.js");

const ProjectRulesModel = db.define(
  "project_rules",
  {
    name: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
  },
  {
    timestamps: true, // This is the default value, so you can omit it if you want
    createdAt: "created_date", // Alias for the createdAt field
    updatedAt: "updated_date", // Alias for the updatedAt field
  }
);

ProjectRulesModel.belongsTo(ProjectsModel, { foreignKey: "project_id" });
module.exports = ProjectRulesModel;
