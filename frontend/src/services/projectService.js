import api from "./api";

export const getProjects = async () => {
    const response = await api.get("/projects");
    return response.data;
};

export const getProjectById = async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
};

export const getProjectBySlug = async (slug) => {
    const response = await api.get(`/projects/slug/${slug}`);
    return response.data;
};

export const createProject = async (projectData, token) => {
    const response = await api.post("/projects", projectData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const updateProject = async (id, projectData, token) => {
    const response = await api.put(
        `/projects/${id}`,
        projectData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const deleteProject = async (id, token) => {
    const response = await api.delete(`/projects/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};