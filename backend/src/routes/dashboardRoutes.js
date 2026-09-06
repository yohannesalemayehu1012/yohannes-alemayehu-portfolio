const express = require("express");

const { getDashboard } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", protect, requireAdmin, getDashboard);

module.exports = router;
