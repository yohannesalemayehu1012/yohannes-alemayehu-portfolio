const express = require("express");

const router = express.Router();

const {
  getAchievements,
  getAchievementItem,
  addAchievement,
  editAchievement,
  removeAchievement,
} = require("../controllers/achievementController");

const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");
const validateId = require("../middleware/validateIdMiddleware");

// Public
router.get("/", getAchievements);
router.get("/:id", validateId, getAchievementItem);

// Protected
router.post("/", protect, requireAdmin, addAchievement);

router.put("/:id", validateId, protect, requireAdmin, editAchievement);

router.delete("/:id", validateId, protect, requireAdmin, removeAchievement);

module.exports = router;
