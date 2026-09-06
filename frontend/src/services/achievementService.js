import api from "./api";


// Get all achievements
export const getAchievements = async () => {
    const response = await api.get(
        "/achievements"
    );

    return response.data;
};


// Get achievement by ID
export const getAchievementById = async (id) => {
    const response = await api.get(
        `/achievements/${id}`
    );

    return response.data;
};


// Create achievement
export const createAchievement = async (
    data,
    token
) => {
    const response = await api.post(
        "/achievements",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// Update achievement
export const updateAchievement = async (
    id,
    data,
    token
) => {
    const response = await api.put(
        `/achievements/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// Delete achievement
export const deleteAchievement = async (
    id,
    token
) => {
    const response = await api.delete(
        `/achievements/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};