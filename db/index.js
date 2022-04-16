const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const Models = require("./models");
const sequelize = new Sequelize(
  "tech_store",
  "postgres",
  "3123pex3123",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const init = async () => {
  // console.log(a)
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await Models.User(sequelize, DataTypes).sync();
};
const User = Models.User(sequelize, DataTypes)


module.exports = {init, User, sequelize}