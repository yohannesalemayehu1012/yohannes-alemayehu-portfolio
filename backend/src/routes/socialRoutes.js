const express = require("express");

const router = express.Router();

const {
  getSocialLinks,
  getAdminSocialLinks,
  getSocialLinkItem,
  addSocialLink,
  editSocialLink,
  removeSocialLink,
} = require("../controllers/socialController");

const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");
const validateId = require("../middleware/validateIdMiddleware");

// Public
router.get("/", getSocialLinks);

// Admin
router.get("/admin", protect, requireAdmin, getAdminSocialLinks);

router.get("/:id", validateId, protect, requireAdmin, getSocialLinkItem);

router.post("/", protect, requireAdmin, addSocialLink);

router.put("/:id", validateId, protect, requireAdmin, editSocialLink);

router.delete("/:id", validateId, protect, requireAdmin, removeSocialLink);

module.exports = router;
