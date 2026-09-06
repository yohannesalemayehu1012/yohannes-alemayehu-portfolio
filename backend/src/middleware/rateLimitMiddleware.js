const rateLimit = require("express-rate-limit");


// ================================
// General API Limiter
// ================================

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 200,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many requests. Please try again later.",
    },
});


// ================================
// Chatbot Limiter
// ================================

const chatbotLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 20,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many chatbot requests. Please wait a few minutes and try again.",
    },
});


module.exports = {
    generalLimiter,
    chatbotLimiter,
};