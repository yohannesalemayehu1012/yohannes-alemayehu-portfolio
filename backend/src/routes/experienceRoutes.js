const express = require("express");

const router = express.Router();

const {
  getExperience,
  getExperienceItem,
  addExperience,
  editExperience,
  removeExperience,
} = require("../controllers/experienceController");

const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");
const validateId = require("../middleware/validateIdMiddleware");

// ==========================================
// PUBLIC
// ==========================================

router.get("/", getExperience);

router.get("/:id", validateId, getExperienceItem);

// ==========================================
// PROTECTED
// ==========================================

router.post("/", protect, requireAdmin, addExperience);

router.put("/:id", validateId, protect, requireAdmin, editExperience);

router.delete("/:id", validateId, protect, requireAdmin, removeExperience);

module.exports = router;
