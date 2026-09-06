const pool = require("../config/database");


// Get all certificates
const getAllCertificates = async () => {
    const result = await pool.query(`
        SELECT *
        FROM certificates
        ORDER BY
            issue_date DESC NULLS LAST,
            id DESC
    `);

    return result.rows;
};


// Get certificate by ID
const getCertificateById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM certificates
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// Create certificate
const createCertificate = async (certificateData) => {
    const {
        title,
        issuer,
        description,
        issue_date,
        credential_id,
        credential_url,
        image_url,
    } = certificateData;

    const result = await pool.query(
        `
        INSERT INTO certificates (
            title,
            issuer,
            description,
            issue_date,
            credential_id,
            credential_url,
            image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
            title,
            issuer,
            description || null,
            issue_date || null,
            credential_id || null,
            credential_url || null,
            image_url || null,
        ]
    );

    return result.rows[0];
};


// Update certificate
const updateCertificate = async (
    id,
    certificateData
) => {
    const {
        title,
        issuer,
        description,
        issue_date,
        credential_id,
        credential_url,
        image_url,
    } = certificateData;

    const result = await pool.query(
        `
        UPDATE certificates
        SET
            title = $1,
            issuer = $2,
            description = $3,
            issue_date = $4,
            credential_id = $5,
            credential_url = $6,
            image_url = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
        `,
        [
            title,
            issuer,
            description || null,
            issue_date || null,
            credential_id || null,
            credential_url || null,
            image_url || null,
            id,
        ]
    );

    return result.rows[0];
};


// Delete certificate
const deleteCertificate = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM certificates
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate,
};