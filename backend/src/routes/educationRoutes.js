const express = require("express");

const router = express.Router();

const {
  getEducation,
  getEducationItem,
  addEducation,
  editEducation,
  removeEducation,
} = require("../controllers/educationController");

const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");
const validateId = require("../middleware/validateIdMiddleware");

// Public routes
router.get("/", getEducation);
router.get("/:id", validateId, getEducationItem);

// Protected admin routes
router.post("/", protect, requireAdmin, addEducation);
router.put("/:id", validateId, protect, requireAdmin, editEducation);
router.delete("/:id", validateId, protect, requireAdmin, removeEducation);

module.exports = router;
