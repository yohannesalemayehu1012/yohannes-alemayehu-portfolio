const express = require("express");

const router = express.Router();

const {
  getProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");
const validateId = require("../middleware/validateIdMiddleware");

// Public
router.get("/", getProjects);

router.get("/slug/:slug", getProjectBySlug);

router.get("/:id", validateId, getProjectById);

// Protected
router.post("/", protect, requireAdmin, createProject);

router.put("/:id", validateId, protect, requireAdmin, updateProject);

router.delete("/:id", validateId, protect, requireAdmin, deleteProject);

module.exports = router;
