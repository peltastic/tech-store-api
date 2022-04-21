const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders");
const isUserMiiddleware = require("../middleware/authJwt");

router.post(
  "/create",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isAdmin],
  orderController.create_orders
);
router.put(
  "/confirm/:orderId",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isAdmin],
  orderController.confirm_order
);

module.exports = router;
