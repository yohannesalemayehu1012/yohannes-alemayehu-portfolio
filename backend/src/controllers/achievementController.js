const {
    getAllAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement,
} = require("../models/achievementModel");


// GET /api/achievements
const getAchievements = async (req, res) => {
    try {
        const achievements = await getAllAchievements();

        res.status(200).json({
            success: true,
            data: achievements,
        });
    } catch (error) {
        console.error("Get achievements error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch achievements",
        });
    }
};


// GET /api/achievements/:id
const getAchievementItem = async (req, res) => {
    try {
        const { id } = req.params;

        const achievement = await getAchievementById(id);

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: "Achievement not found",
            });
        }

        res.status(200).json({
            success: true,
            data: achievement,
        });
    } catch (error) {
        console.error(
            "Get achievement item error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch achievement",
        });
    }
};


// POST /api/achievements
const addAchievement = async (req, res) => {
    try {
        const {
            title,
            description,
            achievement_date,
            image_url,
            link_url,
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Achievement title is required",
            });
        }

        const achievement = await createAchievement({
            title: title.trim(),
            description: description?.trim() || null,
            achievement_date:
                achievement_date || null,
            image_url: image_url?.trim() || null,
            link_url: link_url?.trim() || null,
        });

        res.status(201).json({
            success: true,
            message: "Achievement added successfully",
            data: achievement,
        });
    } catch (error) {
        console.error(
            "Add achievement error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to add achievement",
        });
    }
};


// PUT /api/achievements/:id
const editAchievement = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            achievement_date,
            image_url,
            link_url,
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Achievement title is required",
            });
        }

        const existingAchievement =
            await getAchievementById(id);

        if (!existingAchievement) {
            return res.status(404).json({
                success: false,
                message: "Achievement not found",
            });
        }

        const achievement = await updateAchievement(
            id,
            {
                title: title.trim(),
                description:
                    description?.trim() || null,
                achievement_date:
                    achievement_date || null,
                image_url:
                    image_url?.trim() || null,
                link_url:
                    link_url?.trim() || null,
            }
        );

        res.status(200).json({
            success: true,
            message:
                "Achievement updated successfully",
            data: achievement,
        });
    } catch (error) {
        console.error(
            "Update achievement error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to update achievement",
        });
    }
};


// DELETE /api/achievements/:id
const removeAchievement = async (req, res) => {
    try {
        const { id } = req.params;

        const achievement =
            await deleteAchievement(id);

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: "Achievement not found",
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Achievement deleted successfully",
            data: achievement,
        });
    } catch (error) {
        console.error(
            "Delete achievement error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete achievement",
        });
    }
};


module.exports = {
    getAchievements,
    getAchievementItem,
    addAchievement,
    editAchievement,
    removeAchievement,
};