require('pg').defaults.parseInt8 = true
const { Sequelize, DataTypes } = require("sequelize");
const UserModels = require("./models/user.model");
const RefreshModels = require("./models/refresh.model");
const PhonesModels = require("./models/products/phones.model");
const LaptopModels = require("./models/products/laptops.model");
const OrderModels = require("./models/order.model")
const CartModels = require("./models/cart.model")
const CheckoutModels = require("./models/checkout.model")
const dbConfig = require("../config/db");

const sequelize = new Sequelize(
  dbConfig.DB_NAME || "database",
  dbConfig.DB_DRIVER || "postgres",
  dbConfig.DB_PASSWORD || "password",
  {
    host: dbConfig.DB_HOST ||  "localhost",
    dialect: "postgres",
  }
);
const User = UserModels.User(sequelize, DataTypes);
const Refresh = RefreshModels.Refresh(sequelize, DataTypes);
const ProductPhones = PhonesModels.Phones(sequelize, DataTypes);
const ProductLaptops = LaptopModels.Laptops(sequelize, DataTypes);
const Order = OrderModels.Order(sequelize, DataTypes)
const Cart = CartModels.Cart(sequelize, DataTypes)
const Checkout = CheckoutModels.Checkout(sequelize, DataTypes)
const init = async () => {
  User.hasOne(Refresh, {
    foreignKey: "id",
  });
  User.hasOne(Checkout, {
    foreignKey: "user_id",
  });
  User.hasMany(Order,{
    foreignKey: "user_id"
  })
  User.hasMany(Cart,{
    foreignKey: "user_id"
  })
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await sequelize.sync()
};
module.exports = {
  init,
  sequelize,
  DataTypes,
  User,
  Refresh,
  Order,
  Cart,
  ProductLaptops,
  ProductPhones,
  Checkout
};
