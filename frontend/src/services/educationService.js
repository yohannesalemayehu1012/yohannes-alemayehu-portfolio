import api from "./api";

// Get all education
export const getEducation = async () => {
  const response = await api.get("/education");

  return response.data;
};

export const getEducations = getEducation;

// Get education by ID
export const getEducationById = async (id) => {
  const response = await api.get(`/education/${id}`);

  return response.data;
};

// Create education
export const createEducation = async (data, token) => {
  const response = await api.post("/education", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update education
export const updateEducation = async (id, data, token) => {
  const response = await api.put(`/education/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete education
export const deleteEducation = async (id, token) => {
  const response = await api.delete(`/education/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
