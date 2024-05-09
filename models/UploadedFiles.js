const db = require("../config/db.js");
const { DataTypes } = require("sequelize");
const UserModel = require("./User.js");

const UploadedFilesModel = db.define("uploaded_files", {
  filename: { type: DataTypes.STRING },
  archived: { type: DataTypes.BOOLEAN, defaultValue: false },
});

UploadedFilesModel.belongsTo(UserModel, { foreignKey: "user_id" });
module.exports = UploadedFilesModel;
