const express = require("express");
const { register, login, refreshAccessToken, logout, forgotPassword, resetPassword } = require("../controllers/auth.controller");

const router = express.Router();
const validate = require("../middleware/validate.middleware");
const { registerSchema } = require("../validations/auth.validation");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/register", validate(registerSchema), register);
module.exports = router;