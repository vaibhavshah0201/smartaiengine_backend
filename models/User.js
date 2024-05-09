// importamos la conexión a la DB
const db = require("../config/db.js");

// constamos sequelize
const { DataTypes } = require("sequelize");

const UserModel = db.define("users", {
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

module.exports = UserModel;
