const express = require("express");

const router = express.Router();

const {
  getSettings,
  getSettingItem,
  saveSettings,
  removeSetting,
} = require("../controllers/settingController");

const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");

// Public
router.get("/", getSettings);

// Admin
router.get("/:key", protect, requireAdmin, getSettingItem);

router.put("/", protect, requireAdmin, saveSettings);

router.delete("/:key", protect, requireAdmin, removeSetting);

module.exports = router;
