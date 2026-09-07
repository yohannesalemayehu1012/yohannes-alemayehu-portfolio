import api from "./api";

export const sendChatbotMessage = async (message) => {
    const response = await api.post("/chatbot/message", {
        message,
    });

    return response.data;
};