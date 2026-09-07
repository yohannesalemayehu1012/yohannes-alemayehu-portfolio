import api from "./api";

export const getSocialLinks = async () => {
  const response = await api.get("/social-links");
  return response.data;
};

export const getAdminSocialLinks = getSocialLinks;

export const createSocialLink = async (socialData) => {
  const response = await api.post("/social-links", socialData);
  return response.data;
};

export const updateSocialLink = async (id, socialData) => {
  const response = await api.put(`/social-links/${id}`, socialData);
  return response.data;
};

export const deleteSocialLink = async (id) => {
  const response = await api.delete(`/social-links/${id}`);
  return response.data;
};
