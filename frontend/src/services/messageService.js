import api from "./api";

// Public
export const sendMessage = async (data) => {
    const response = await api.post("/messages", data);

    return response.data;
};

// Admin
export const getMessages = async (token) => {
    const response = await api.get("/messages", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Admin
export const getMessageById = async (id, token) => {
    const response = await api.get(`/messages/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Admin
export const updateMessageStatus = async (
    id,
    status,
    token
) => {
    const response = await api.patch(
        `/messages/${id}/status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Admin
export const deleteMessage = async (id, token) => {
    const response = await api.delete(`/messages/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};