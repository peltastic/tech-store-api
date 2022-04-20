const { Sequelize, DataTypes } = require("sequelize");
const UserModels = require("./models/user.model");
const RefreshModels = require("./models/refresh.model");
const PhonesModels = require("./models/products/phones.model");
const LaptopModels = require("./models/products/laptops.model");
const dbConfig = require("../config/db");

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_DRIVER,
  dbConfig.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
const User = UserModels.User(sequelize, DataTypes);
const Refresh = RefreshModels.Refresh(sequelize, DataTypes);
const ProductPhones = PhonesModels.Phones(sequelize, DataTypes);
const ProductLaptops = LaptopModels.Laptops(sequelize, DataTypes);
const init = async () => {
  User.hasOne(Refresh, {
    foreignKey: "id",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await User.sync();
  await Refresh.sync();
  await ProductLaptops.sync();
  await ProductPhones.sync();
};
module.exports = {
  init,
  sequelize,
  DataTypes,
  User,
  Refresh,
  ProductLaptops,
  ProductPhones,
};
