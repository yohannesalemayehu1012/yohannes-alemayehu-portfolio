import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

import ChatbotMessage from "./ChatbotMessage";
import ChatbotInput from "./ChatbotInput";

import { sendChatbotMessage } from "../../services/chatbotService";
import { getErrorMessage } from "../../utils/errorHandler";

import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm Yohannes's AI assistant. I can help you learn about his skills, projects, education, experience, certificates, achievements, and contact information.",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const nextMessageIdRef = useRef(2);

  const quickQuestions = [
    "Who is Yohannes?",
    "What are his skills?",
    "What projects has he built?",
    "How can I contact him?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const getNextMessageId = () => {
    const messageId = nextMessageIdRef.current;
    nextMessageIdRef.current += 1;
    return messageId;
  };

  const handleSendMessage = async (text) => {
    if (isLoading) {
      return;
    }

    const userMessage = {
      id: getNextMessageId(),
      sender: "user",
      text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      const conversation = updatedMessages.slice(-10).map((message) => ({
        sender: message.sender,
        text: message.text,
      }));

      const response = await sendChatbotMessage(text, conversation);

      const botMessage = {
        id: getNextMessageId(),
        sender: "bot",
        text: response.message || "Sorry, I couldn't generate a response.",
      };

      setMessages((previousMessages) => [...previousMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);

      let errorMessage = "Sorry, something went wrong. Please try again.";

      if (error.response?.status === 429) {
        errorMessage =
          "You're sending messages too quickly. Please wait a few minutes and try again.";
      } else if (error.code === "ECONNABORTED") {
        errorMessage =
          "The chatbot is taking too long to respond. Please try again.";
      } else if (error.response?.status === 400) {
        errorMessage =
          error.response.data?.message ||
          "Please check your message and try again.";
      } else if (error.response?.status >= 500) {
        errorMessage =
          "The chatbot is temporarily unavailable. Please try again later.";
      } else if (error.request) {
        errorMessage =
          "I can't connect to the chatbot server right now. Please try again later.";
      } else {
        errorMessage = getErrorMessage(error, errorMessage);
      }

      const botMessage = {
        id: getNextMessageId(),
        sender: "bot",
        text: errorMessage,
      };

      setMessages((previousMessages) => [...previousMessages, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    if (isLoading) {
      return;
    }

    handleSendMessage(question);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant"
          aria-expanded={isOpen}
        >
          <FiMessageCircle size={25} />
        </button>
      )}

      {isOpen && (
        <div
          className="chatbot-window"
          role="dialog"
          aria-label="Yohannes AI Assistant"
        >
          {/* Chatbot Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-header-avatar">🤖</div>

              <div>
                <h3>Yohannes AI Assistant</h3>

                <span>Portfolio Assistant</span>
              </div>
            </div>

            <button
              className="chatbot-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Chatbot Body */}
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.map((message) => (
                <ChatbotMessage key={message.id} message={message} />
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div
                  className="chatbot-message-row bot-message-row"
                  aria-live="polite"
                  aria-label="Assistant is typing"
                >
                  <div className="chatbot-avatar">🤖</div>

                  <div
                    className="chatbot-message bot-message chatbot-typing"
                    aria-hidden="true"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="chatbot-quick-questions">
                <p>Quick questions</p>

                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chatbot Input */}
          <ChatbotInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      )}
    </>
  );
};

export default Chatbot;
