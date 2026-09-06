const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const {
  getMessages,
  getMessageItem,
  sendMessage,
  markMessageStatus,
  removeMessage,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

const requireAdmin = require("../middleware/roleMiddleware");
const validateId = require("../middleware/validateIdMiddleware");

const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages sent. Please try again later.",
  },
});

// Public contact form
router.post("/", messageLimiter, sendMessage);

// Protected admin routes
router.get("/", protect, requireAdmin, getMessages);

router.get("/:id", validateId, protect, requireAdmin, getMessageItem);

router.patch(
  "/:id/status",
  validateId,
  protect,
  requireAdmin,
  markMessageStatus,
);

router.delete("/:id", validateId, protect, requireAdmin, removeMessage);

module.exports = router;
