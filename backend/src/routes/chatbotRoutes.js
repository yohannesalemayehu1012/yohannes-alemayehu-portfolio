const express = require("express");

const {
    sendChatbotMessage,
} = require("../controllers/chatbotController");

const {
    chatbotLimiter,
} = require("../middleware/rateLimitMiddleware");

const router = express.Router();

router.post(
    "/message",
    chatbotLimiter,
    sendChatbotMessage
);

module.exports = router;