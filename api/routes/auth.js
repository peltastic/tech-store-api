const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const verifyJwt = require("../middleware/authJwt")


router.post("/signup", authController.sign_user_up);
router.post("/login", authController.login_user);                           
router.post("/user", [verifyJwt.verifyToken] ,authController.user);                           
router.post("/refresh", authController.refreshToken)                           
router.post("/logout", verifyJwt.verifyToken, authController.logout)                           
// router.get("/test", authController.test_func);

module.exports = router;
