const {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessageStatus,
  deleteMessage,
} = require("../models/messageModel");

// Email validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// GET /api/messages
// Admin only
const getMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load messages",
    });
  }
};

// GET /api/messages/:id
// Admin only
const getMessageItem = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await getMessageById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error("Get message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load message",
    });
  }
};

// POST /api/messages
// Public
const sendMessage = async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const subject = String(req.body.subject || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (name.length < 2 || name.length > 100) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name must be between 2 and 100 characters",
        });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (subject.length > 250) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Subject must not exceed 250 characters",
        });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (message.length < 10 || message.length > 5000) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Message must be between 10 and 5000 characters",
        });
    }

    const newMessage = await createMessage({
      name,
      email,
      subject: subject || null,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

// PATCH /api/messages/:id/status
// Admin only
const markMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["read", "unread"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either read or unread",
      });
    }

    const updatedMessage = await updateMessageStatus(id, status);

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Message marked as ${status}`,
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Update message status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update message status",
    });
  }
};

// DELETE /api/messages/:id
// Admin only
const removeMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await deleteMessage(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: deletedMessage,
    });
  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};

module.exports = {
  getMessages,
  getMessageItem,
  sendMessage,
  markMessageStatus,
  removeMessage,
};
