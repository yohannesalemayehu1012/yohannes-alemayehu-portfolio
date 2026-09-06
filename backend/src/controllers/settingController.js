const {
    getAllSettings,
    getSettingByKey,
    upsertSetting,
    deleteSetting,
} = require("../models/settingModel");

// GET /api/settings
// Public
const getSettings = async (req, res) => {
    try {
        const settings = await getAllSettings();

        const settingsObject = {};

        settings.forEach((setting) => {
            settingsObject[setting.setting_key] =
                setting.setting_value;
        });

        res.status(200).json({
            success: true,
            data: settingsObject,
        });
    } catch (error) {
        console.error(
            "Get settings error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load settings",
        });
    }
};

// GET /api/settings/:key
// Admin
const getSettingItem = async (req, res) => {
    try {
        const { key } = req.params;

        const setting =
            await getSettingByKey(key);

        if (!setting) {
            return res.status(404).json({
                success: false,
                message: "Setting not found",
            });
        }

        res.status(200).json({
            success: true,
            data: setting,
        });
    } catch (error) {
        console.error(
            "Get setting error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load setting",
        });
    }
};

// PUT /api/settings
// Admin
const saveSettings = async (req, res) => {
    try {
        const settings = req.body;

        if (
            !settings ||
            typeof settings !== "object"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid settings data",
            });
        }

        const allowedKeys = [
            "site_name",
            "professional_title",
            "hero_description",
            "about_description",
            "email",
            "phone",
            "location",
            "resume_url",
            "availability",
            "footer_text",
        ];

        const savedSettings = {};

        for (const key of allowedKeys) {
            if (
                Object.prototype.hasOwnProperty.call(
                    settings,
                    key
                )
            ) {
                const value =
                    settings[key] === null ||
                    settings[key] === undefined
                        ? ""
                        : String(settings[key]).trim();

                const saved =
                    await upsertSetting(
                        key,
                        value
                    );

                savedSettings[key] =
                    saved.setting_value;
            }
        }

        res.status(200).json({
            success: true,
            message: "Settings saved successfully",
            data: savedSettings,
        });
    } catch (error) {
        console.error(
            "Save settings error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to save settings",
        });
    }
};

// DELETE /api/settings/:key
// Admin
const removeSetting = async (req, res) => {
    try {
        const { key } = req.params;

        const deletedSetting =
            await deleteSetting(key);

        if (!deletedSetting) {
            return res.status(404).json({
                success: false,
                message: "Setting not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Setting deleted successfully",
            data: deletedSetting,
        });
    } catch (error) {
        console.error(
            "Delete setting error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete setting",
        });
    }
};

module.exports = {
    getSettings,
    getSettingItem,
    saveSettings,
    removeSetting,
};