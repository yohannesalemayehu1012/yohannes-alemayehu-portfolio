import api from "./api";

// Public active links
export const getSocialLinks = async () => {
    const response = await api.get(
        "/social-links"
    );

    return response.data;
};

// Admin all links
export const getAdminSocialLinks = async (
    token
) => {
    const response = await api.get(
        "/social-links/admin",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Get one link
export const getSocialLinkById = async (
    id,
    token
) => {
    const response = await api.get(
        `/social-links/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Create
export const createSocialLink = async (
    data,
    token
) => {
    const response = await api.post(
        "/social-links",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Update
export const updateSocialLink = async (
    id,
    data,
    token
) => {
    const response = await api.put(
        `/social-links/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Delete
export const deleteSocialLink = async (
    id,
    token
) => {
    const response = await api.delete(
        `/social-links/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};