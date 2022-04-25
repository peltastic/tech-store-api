const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const authRoutes = require("./api/routes/auth");
const cartRoutes = require("./api/routes/carts");
const productsRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const checkoutRoutes = require("./api/routes/checkout");
dotenv.config();
const DB = require("./db");
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  next();
});

DB.init();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/checkout", checkoutRoutes);

app.listen(process.env.PORT || 8000, () => console.log("server is running"));
