import api from "./api";

export const sendChatbotMessage = async (message, conversation = []) => {
  const response = await api.post("/chatbot/message", {
    message,
    conversation,
  });

  return response.data;
};
