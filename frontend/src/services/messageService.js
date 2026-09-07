import api from "./api";

export const sendMessage = async (messageData) => {
  const response = await api.post("/messages", messageData);
  return response.data;
};

export const getMessages = async () => {
  const response = await api.get("/messages");
  return response.data;
};

export const updateMessage = async (id, messageData) => {
  const response = await api.put(`/messages/${id}`, messageData);
  return response.data;
};

export const updateMessageStatus = async (id, status) => {
  return updateMessage(id, { status });
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/messages/${id}`);
  return response.data;
};
