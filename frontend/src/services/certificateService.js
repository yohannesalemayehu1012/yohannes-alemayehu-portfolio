import api from "./api";


// Get all certificates
export const getCertificates = async () => {
    const response = await api.get(
        "/certificates"
    );

    return response.data;
};


// Get certificate by ID
export const getCertificateById = async (id) => {
    const response = await api.get(
        `/certificates/${id}`
    );

    return response.data;
};


// Create certificate
export const createCertificate = async (
    data,
    token
) => {
    const response = await api.post(
        "/certificates",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// Update certificate
export const updateCertificate = async (
    id,
    data,
    token
) => {
    const response = await api.put(
        `/certificates/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// Delete certificate
export const deleteCertificate = async (
    id,
    token
) => {
    const response = await api.delete(
        `/certificates/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};