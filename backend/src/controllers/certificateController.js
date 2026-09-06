const {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate,
} = require("../models/certificateModel");


// GET /api/certificates
const getCertificates = async (req, res) => {
    try {
        const certificates =
            await getAllCertificates();

        res.status(200).json({
            success: true,
            data: certificates,
        });
    } catch (error) {
        console.error(
            "Get certificates error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch certificates",
        });
    }
};


// GET /api/certificates/:id
const getCertificateItem = async (req, res) => {
    try {
        const { id } = req.params;

        const certificate =
            await getCertificateById(id);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found",
            });
        }

        res.status(200).json({
            success: true,
            data: certificate,
        });
    } catch (error) {
        console.error(
            "Get certificate error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch certificate",
        });
    }
};


// POST /api/certificates
const addCertificate = async (req, res) => {
    try {
        const {
            title,
            issuer,
            description,
            issue_date,
            credential_id,
            credential_url,
            image_url,
        } = req.body;


        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Certificate title is required",
            });
        }


        if (!issuer || !issuer.trim()) {
            return res.status(400).json({
                success: false,
                message: "Certificate issuer is required",
            });
        }


        const certificate =
            await createCertificate({
                title: title.trim(),
                issuer: issuer.trim(),
                description:
                    description?.trim() || null,
                issue_date:
                    issue_date || null,
                credential_id:
                    credential_id?.trim() || null,
                credential_url:
                    credential_url?.trim() || null,
                image_url:
                    image_url?.trim() || null,
            });


        res.status(201).json({
            success: true,
            message:
                "Certificate added successfully",
            data: certificate,
        });

    } catch (error) {
        console.error(
            "Add certificate error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to add certificate",
        });
    }
};


// PUT /api/certificates/:id
const editCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            issuer,
            description,
            issue_date,
            credential_id,
            credential_url,
            image_url,
        } = req.body;


        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Certificate title is required",
            });
        }


        if (!issuer || !issuer.trim()) {
            return res.status(400).json({
                success: false,
                message: "Certificate issuer is required",
            });
        }


        const existingCertificate =
            await getCertificateById(id);


        if (!existingCertificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found",
            });
        }


        const certificate =
            await updateCertificate(
                id,
                {
                    title: title.trim(),
                    issuer: issuer.trim(),
                    description:
                        description?.trim() || null,
                    issue_date:
                        issue_date || null,
                    credential_id:
                        credential_id?.trim() || null,
                    credential_url:
                        credential_url?.trim() || null,
                    image_url:
                        image_url?.trim() || null,
                }
            );


        res.status(200).json({
            success: true,
            message:
                "Certificate updated successfully",
            data: certificate,
        });

    } catch (error) {
        console.error(
            "Update certificate error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to update certificate",
        });
    }
};


// DELETE /api/certificates/:id
const removeCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        const certificate =
            await deleteCertificate(id);


        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found",
            });
        }


        res.status(200).json({
            success: true,
            message:
                "Certificate deleted successfully",
            data: certificate,
        });

    } catch (error) {
        console.error(
            "Delete certificate error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to delete certificate",
        });
    }
};


module.exports = {
    getCertificates,
    getCertificateItem,
    addCertificate,
    editCertificate,
    removeCertificate,
};