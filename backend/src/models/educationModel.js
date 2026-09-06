const pool = require("../config/database");

// Get all education records
const getAllEducation = async () => {
    const result = await pool.query(`
        SELECT *
        FROM education
        ORDER BY
            current_education DESC,
            start_date DESC NULLS LAST,
            id DESC
    `);

    return result.rows;
};


// Get education by ID
const getEducationById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM education
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// Create education
const createEducation = async (educationData) => {
    const {
        institution,
        degree,
        department,
        description,
        start_date,
        end_date,
        current_education,
    } = educationData;

    const result = await pool.query(
        `
        INSERT INTO education (
            institution,
            degree,
            department,
            description,
            start_date,
            end_date,
            current_education
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
            institution,
            degree,
            department || null,
            description || null,
            start_date || null,
            end_date || null,
            current_education || false,
        ]
    );

    return result.rows[0];
};


// Update education
const updateEducation = async (id, educationData) => {
    const {
        institution,
        degree,
        department,
        description,
        start_date,
        end_date,
        current_education,
    } = educationData;

    const result = await pool.query(
        `
        UPDATE education
        SET
            institution = $1,
            degree = $2,
            department = $3,
            description = $4,
            start_date = $5,
            end_date = $6,
            current_education = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
        `,
        [
            institution,
            degree,
            department || null,
            description || null,
            start_date || null,
            end_date || null,
            current_education || false,
            id,
        ]
    );

    return result.rows[0];
};


// Delete education
const deleteEducation = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM education
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getAllEducation,
    getEducationById,
    createEducation,
    updateEducation,
    deleteEducation,
};