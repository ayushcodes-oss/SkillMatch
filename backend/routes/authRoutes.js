const express = require("express");
const router = express.Router();

const {
    register,
    login,
    changePassword,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

const {
    protect
} = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");

const {
    registerSchema,
    loginSchema,
    changePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} = require("../validation/schemas");


// Register
router.post(
    "/register",
    validate(registerSchema),
    register
);


// Login
router.post(
    "/login",
    validate(loginSchema),
    login
);


// Change Password
router.put(
    "/change-password",
    protect,
    validate(changePasswordSchema),
    changePassword
);


// Forgot Password
router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    forgotPassword
);


// Reset Password
router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    resetPassword
);


module.exports = router;