const db = require("../config/db.js");
const { DataTypes } = require("sequelize");
const ProjectsModel = require("./Projects.js");
const UserModel = require("./User.js");

const ProjectFilesModel = db.define(
  "project_files",
  {
    name: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    path: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: true, // This is the default value, so you can omit it if you want
    createdAt: "created_date", // Alias for the createdAt field
    updatedAt: "updated_date", // Alias for the updatedAt field
  }
);

ProjectFilesModel.belongsTo(UserModel, { foreignKey: "user_id" });
ProjectFilesModel.belongsTo(ProjectsModel, { foreignKey: "project_id" });
module.exports = ProjectFilesModel;
