import api from "./api";


// GET
export const getSkills = async () => {
    const response = await api.get("/skills");

    return response.data;
};


// CREATE
export const createSkill = async (data, token) => {
    const response = await api.post(
        "/skills",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// UPDATE
export const updateSkill = async (
    id,
    data,
    token
) => {
    const response = await api.put(
        `/skills/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// DELETE
export const deleteSkill = async (
    id,
    token
) => {
    const response = await api.delete(
        `/skills/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};