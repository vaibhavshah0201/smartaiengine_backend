// importamos la conexión a la DB
const db = require("../config/db.js");

// constamos sequelize
const { DataTypes } = require("sequelize");

const UserModel = db.define(
  "users",
  {
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  },
  {
    timestamps: true, // This is the default value, so you can omit it if you want
    createdAt: "created_date", // Alias for the createdAt field
    updatedAt: "updated_date", // Alias for the updatedAt field
  }
);

module.exports = UserModel;
