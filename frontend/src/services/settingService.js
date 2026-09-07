import api from "./api";

export const getSettings = async () => {
  const response = await api.get("/settings");
  return response.data;
};

export const updateSetting = async (settingData) => {
  const response = await api.put("/settings", settingData);
  return response.data;
};

export const saveSettings = updateSetting;
