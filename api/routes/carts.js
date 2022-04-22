const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const isUserMiiddleware = require("../middleware/authJwt");

router.post(
  "/add",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isUser],
  cartController.create_cart
);
router.put(
  "/update/increase/:cartId",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isUser],
  cartController.increase_cart_count
);
router.put(
  "/update/decrease/:cartId",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isUser],
  cartController.decrease_cart_count
);
router.put(
  "/delete/:cartId",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isUser],
  cartController.delete_cart
);
router.get(
  "/getcarts/:userId",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isUser],
  cartController.get_user_cart
);

module.exports = router;
