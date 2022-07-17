const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const rolesMiddleware = require("../middleware/authJwt");

router.post(
  "/add",
  [rolesMiddleware.verifyToken, rolesMiddleware.isAdmin],
  productsController.add_product
);
router.get("/getproducts", productsController.get_products);
router.get("/:id", productsController.get_product);

module.exports = router;
