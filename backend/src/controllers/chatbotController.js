const {
    generateChatbotResponse,
} = require("../services/chatbotService");

const sendChatbotMessage = async (
    req,
    res,
    next
) => {
    try {
        const {
            message,
            conversation = [],
        } = req.body;

        if (
            typeof message !== "string" ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });
        }

        const trimmedMessage =
            message.trim();

        if (trimmedMessage.length < 2) {
            return res.status(400).json({
                success: false,
                message:
                    "Message must contain at least 2 characters.",
            });
        }

        if (trimmedMessage.length > 1000) {
            return res.status(400).json({
                success: false,
                message:
                    "Message must not exceed 1000 characters.",
            });
        }

        if (!Array.isArray(conversation)) {
            return res.status(400).json({
                success: false,
                message:
                    "Conversation must be an array.",
            });
        }

        const limitedConversation =
            conversation.slice(-10);

        const sanitizedConversation =
            limitedConversation
                .filter(
                    (item) =>
                        item &&
                        typeof item.text ===
                            "string" &&
                        ["user", "bot"].includes(
                            item.sender
                        )
                )
                .map((item) => ({
                    sender: item.sender,
                    text: item.text
                        .trim()
                        .slice(0, 1000),
                }));

        const response =
            await generateChatbotResponse(
                trimmedMessage,
                sanitizedConversation
            );

        if (!response) {
            return res.status(503).json({
                success: false,
                message:
                    "The chatbot could not generate a response right now.",
            });
        }

        return res.status(200).json({
            success: true,
            message: response,
        });
    } catch (error) {
        console.error(
            "❌ Chatbot Controller Error:",
            error
        );

        next(error);
    }
};

module.exports = {
    sendChatbotMessage,
};