import api from "./api";

export const getCertificates = async () => {
    const response = await api.get("/certificates");
    return response.data;
};

export const createCertificate = async (certificateData) => {
    const response = await api.post("/certificates", certificateData);
    return response.data;
};

export const updateCertificate = async (id, certificateData) => {
    const response = await api.put(`/certificates/${id}`, certificateData);
    return response.data;
};

export const deleteCertificate = async (id) => {
    const response = await api.delete(`/certificates/${id}`);
    return response.data;
};