const { Sequelize, DataTypes } = require("sequelize");
const UserModels = require("./models/user.model");
const RefreshModels = require("./models/refresh.model");
const dbConfig = require("../api/config/db");

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_DRIVER,
  dbConfig.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
const User = UserModels.User(sequelize, DataTypes)
const Refresh = RefreshModels.Refresh(sequelize, DataTypes);
const init = async () => {
  User.hasOne(Refresh, {
    foreignKey: "id"
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await User.sync();
  await Refresh.sync();
};
;
module.exports = { init, sequelize, DataTypes, User, Refresh };
