const pool = require("../config/database");


// Get all achievements
const getAllAchievements = async () => {
    const result = await pool.query(`
        SELECT *
        FROM achievements
        ORDER BY
            achievement_date DESC NULLS LAST,
            id DESC
    `);

    return result.rows;
};


// Get achievement by ID
const getAchievementById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM achievements
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// Create achievement
const createAchievement = async (achievementData) => {
    const {
        title,
        description,
        achievement_date,
        image_url,
        link_url,
    } = achievementData;

    const result = await pool.query(
        `
        INSERT INTO achievements (
            title,
            description,
            achievement_date,
            image_url,
            link_url
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
            title,
            description || null,
            achievement_date || null,
            image_url || null,
            link_url || null,
        ]
    );

    return result.rows[0];
};


// Update achievement
const updateAchievement = async (id, achievementData) => {
    const {
        title,
        description,
        achievement_date,
        image_url,
        link_url,
    } = achievementData;

    const result = await pool.query(
        `
        UPDATE achievements
        SET
            title = $1,
            description = $2,
            achievement_date = $3,
            image_url = $4,
            link_url = $5,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
        `,
        [
            title,
            description || null,
            achievement_date || null,
            image_url || null,
            link_url || null,
            id,
        ]
    );

    return result.rows[0];
};


// Delete achievement
const deleteAchievement = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM achievements
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getAllAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement,
};