import api from "./api";

// Public settings
export const getSettings = async () => {
    const response = await api.get(
        "/settings"
    );

    return response.data;
};

// Get one setting
export const getSettingByKey = async (
    key,
    token
) => {
    const response = await api.get(
        `/settings/${key}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Save settings
export const saveSettings = async (
    data,
    token
) => {
    const response = await api.put(
        "/settings",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Delete setting
export const deleteSetting = async (
    key,
    token
) => {
    const response = await api.delete(
        `/settings/${key}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};