const Sequelize = require("sequelize");

const db = new Sequelize("react_express_mysql_login", "root", "password", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

module.exports = db;
// export default db;
