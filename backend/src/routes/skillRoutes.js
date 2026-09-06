const express = require("express");

const router = express.Router();

const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");
const validateId = require("../middleware/validateIdMiddleware");

// Public
router.get("/", getSkills);
router.get("/:id", validateId, getSkillById);

// Admin
router.post("/", protect, requireAdmin, createSkill);
router.put("/:id", validateId, protect, requireAdmin, updateSkill);
router.delete("/:id", validateId, protect, requireAdmin, deleteSkill);

module.exports = router;
