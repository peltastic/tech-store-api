const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/auth");

router.post("/signup", signUpController.sign_user_up);
router.post("/login",);
router.get("/test", signUpController.test_func);

module.exports = router;
