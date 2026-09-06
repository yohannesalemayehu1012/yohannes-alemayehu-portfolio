const pool = require("../config/database");

// Get all settings
const getAllSettings = async () => {
    const result = await pool.query(`
        SELECT *
        FROM site_settings
        ORDER BY id ASC
    `);

    return result.rows;
};

// Get one setting by key
const getSettingByKey = async (key) => {
    const result = await pool.query(
        `
        SELECT *
        FROM site_settings
        WHERE setting_key = $1
        `,
        [key]
    );

    return result.rows[0];
};

// Create or update setting
const upsertSetting = async (
    settingKey,
    settingValue
) => {
    const result = await pool.query(
        `
        INSERT INTO site_settings (
            setting_key,
            setting_value
        )
        VALUES ($1, $2)

        ON CONFLICT (setting_key)
        DO UPDATE SET
            setting_value = EXCLUDED.setting_value,
            updated_at = CURRENT_TIMESTAMP

        RETURNING *
        `,
        [
            settingKey,
            settingValue,
        ]
    );

    return result.rows[0];
};

// Delete setting
const deleteSetting = async (key) => {
    const result = await pool.query(
        `
        DELETE FROM site_settings
        WHERE setting_key = $1
        RETURNING *
        `,
        [key]
    );

    return result.rows[0];
};

module.exports = {
    getAllSettings,
    getSettingByKey,
    upsertSetting,
    deleteSetting,
};