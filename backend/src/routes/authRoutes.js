const express = require("express");
const rateLimit = require("express-rate-limit");

const { login } = require("../controllers/authController");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// POST /api/auth/login

router.post("/login", loginLimiter, login);

module.exports = router;
