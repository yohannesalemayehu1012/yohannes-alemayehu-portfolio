const pool = require("../config/database");

// Get all social links
const getAllSocialLinks = async () => {
    const result = await pool.query(`
        SELECT *
        FROM social_links
        ORDER BY display_order ASC, id ASC
    `);

    return result.rows;
};

// Get active social links
const getActiveSocialLinks = async () => {
    const result = await pool.query(`
        SELECT *
        FROM social_links
        WHERE is_active = TRUE
        ORDER BY display_order ASC, id ASC
    `);

    return result.rows;
};

// Get social link by ID
const getSocialLinkById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM social_links
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

// Create social link
const createSocialLink = async (socialData) => {
    const {
        platform,
        url,
        icon,
        display_order,
        is_active,
    } = socialData;

    const result = await pool.query(
        `
        INSERT INTO social_links (
            platform,
            url,
            icon,
            display_order,
            is_active
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
            platform,
            url,
            icon || null,
            display_order || 0,
            is_active !== undefined
                ? is_active
                : true,
        ]
    );

    return result.rows[0];
};

// Update social link
const updateSocialLink = async (id, socialData) => {
    const {
        platform,
        url,
        icon,
        display_order,
        is_active,
    } = socialData;

    const result = await pool.query(
        `
        UPDATE social_links
        SET
            platform = $1,
            url = $2,
            icon = $3,
            display_order = $4,
            is_active = $5,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
        `,
        [
            platform,
            url,
            icon || null,
            display_order || 0,
            is_active !== undefined
                ? is_active
                : true,
            id,
        ]
    );

    return result.rows[0];
};

// Delete social link
const deleteSocialLink = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM social_links
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllSocialLinks,
    getActiveSocialLinks,
    getSocialLinkById,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
};