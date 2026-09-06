const pool = require("../config/database");


// =====================================================
// GET ALL SKILLS
// =====================================================

const getAllSkills = async () => {

    const result = await pool.query(`
        SELECT *
        FROM skills
        ORDER BY
            category ASC,
            display_order ASC,
            id ASC
    `);

    return result.rows;
};


// =====================================================
// GET SKILL BY ID
// =====================================================

const getSkillById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM skills
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// =====================================================
// CREATE SKILL
// =====================================================

const createSkill = async (skillData) => {

    const {
        name,
        category,
        icon,
        description,
        display_order,
    } = skillData;


    const result = await pool.query(
        `
        INSERT INTO skills (
            name,
            category,
            icon,
            description,
            display_order
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
            name,
            category,
            icon || null,
            description || null,
            display_order || 0,
        ]
    );

    return result.rows[0];
};


// =====================================================
// UPDATE SKILL
// =====================================================

const updateSkill = async (id, skillData) => {

    const {
        name,
        category,
        icon,
        description,
        display_order,
    } = skillData;


    const result = await pool.query(
        `
        UPDATE skills
        SET
            name = $1,
            category = $2,
            icon = $3,
            description = $4,
            display_order = $5,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
        `,
        [
            name,
            category,
            icon || null,
            description || null,
            display_order || 0,
            id,
        ]
    );

    return result.rows[0];
};


// =====================================================
// DELETE SKILL
// =====================================================

const deleteSkill = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM skills
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
};