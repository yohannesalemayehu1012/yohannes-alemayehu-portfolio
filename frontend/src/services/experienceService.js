import api from "./api";

// ==========================================
// GET ALL
// ==========================================

export const getExperience = async () => {
  const response = await api.get("/experience");

  return response.data;
};

// ==========================================
// GET BY ID
// ==========================================

export const getExperienceById = async (id) => {
  const response = await api.get(`/experience/${id}`);

  return response.data;
};

// ==========================================
// CREATE
// ==========================================

export const createExperience = async (data, token) => {
  const response = await api.post("/experience", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==========================================
// UPDATE
// ==========================================

export const updateExperience = async (id, data, token) => {
  const response = await api.put(`/experience/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==========================================
// DELETE
// ==========================================

export const deleteExperience = async (id, token) => {
  const response = await api.delete(`/experience/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getExperiences = getExperience;
