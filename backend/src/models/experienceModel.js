const pool = require("../config/database");


// ==========================================
// GET ALL EXPERIENCE
// ==========================================

const getAllExperience = async () => {
    const result = await pool.query(`
        SELECT *
        FROM experience
        ORDER BY
            current_position DESC,
            start_date DESC,
            id DESC
    `);

    return result.rows;
};


// ==========================================
// GET EXPERIENCE BY ID
// ==========================================

const getExperienceById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM experience
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// ==========================================
// CREATE EXPERIENCE
// ==========================================

const createExperience = async (experienceData) => {

    const {
        company,
        position,
        description,
        start_date,
        end_date,
        current_position,
        location,
    } = experienceData;

    const result = await pool.query(
        `
        INSERT INTO experience (
            company,
            position,
            description,
            start_date,
            end_date,
            current_position,
            location
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
            company,
            position,
            description,
            start_date,
            end_date || null,
            current_position || false,
            location || null,
        ]
    );

    return result.rows[0];
};


// ==========================================
// UPDATE EXPERIENCE
// ==========================================

const updateExperience = async (
    id,
    experienceData
) => {

    const {
        company,
        position,
        description,
        start_date,
        end_date,
        current_position,
        location,
    } = experienceData;

    const result = await pool.query(
        `
        UPDATE experience
        SET
            company = $1,
            position = $2,
            description = $3,
            start_date = $4,
            end_date = $5,
            current_position = $6,
            location = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
        `,
        [
            company,
            position,
            description,
            start_date,
            end_date || null,
            current_position || false,
            location || null,
            id,
        ]
    );

    return result.rows[0];
};


// ==========================================
// DELETE EXPERIENCE
// ==========================================

const deleteExperience = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM experience
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getAllExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
};