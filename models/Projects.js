// importamos la conexión a la DB
const db = require("../config/db.js");

// constamos sequelize
const { DataTypes } = require("sequelize");
const UserModel = require("./User.js");

const ProjectsModel = db.define(
  "projects",
  {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: true, // This is the default value, so you can omit it if you want
    createdAt: "created_date", // Alias for the createdAt field
    updatedAt: "updated_date", // Alias for the updatedAt field
  }
);

ProjectsModel.belongsTo(UserModel, { foreignKey: "user_id" });
module.exports = ProjectsModel;
