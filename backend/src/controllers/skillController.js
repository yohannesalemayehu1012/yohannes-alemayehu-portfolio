const skillModel = require("../models/skillModel");


// =====================================================
// GET ALL SKILLS
// PUBLIC
// =====================================================

const getSkills = async (req, res) => {

    try {

        const skills = await skillModel.getAllSkills();

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills,
        });

    } catch (error) {

        console.error("Get skills error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch skills",
        });
    }
};


// =====================================================
// GET SKILL BY ID
// PUBLIC
// =====================================================

const getSkillById = async (req, res) => {

    try {

        const { id } = req.params;

        const skill = await skillModel.getSkillById(id);

        if (!skill) {

            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }

        res.status(200).json({
            success: true,
            data: skill,
        });

    } catch (error) {

        console.error("Get skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch skill",
        });
    }
};


// =====================================================
// CREATE SKILL
// ADMIN ONLY
// =====================================================

const createSkill = async (req, res) => {

    try {

        const {
            name,
            category,
            icon,
            description,
            display_order,
        } = req.body;


        // ---------------------------------------------
        // VALIDATE NAME
        // ---------------------------------------------

        if (!name || !name.trim()) {

            return res.status(400).json({
                success: false,
                message: "Skill name is required",
            });
        }


        // ---------------------------------------------
        // VALIDATE CATEGORY
        // ---------------------------------------------

        if (!category || !category.trim()) {

            return res.status(400).json({
                success: false,
                message: "Skill category is required",
            });
        }


        // ---------------------------------------------
        // CREATE SKILL
        // ---------------------------------------------

        const skill = await skillModel.createSkill({
            name: name.trim(),
            category: category.trim(),
            icon: icon?.trim() || null,
            description: description?.trim() || null,
            display_order: display_order || 0,
        });


        res.status(201).json({
            success: true,
            message: "Skill created successfully",
            data: skill,
        });

    } catch (error) {

        console.error("Create skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create skill",
        });
    }
};


// =====================================================
// UPDATE SKILL
// ADMIN ONLY
// =====================================================

const updateSkill = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            category,
            icon,
            description,
            display_order,
        } = req.body;


        // ---------------------------------------------
        // VALIDATE NAME
        // ---------------------------------------------

        if (!name || !name.trim()) {

            return res.status(400).json({
                success: false,
                message: "Skill name is required",
            });
        }


        // ---------------------------------------------
        // VALIDATE CATEGORY
        // ---------------------------------------------

        if (!category || !category.trim()) {

            return res.status(400).json({
                success: false,
                message: "Skill category is required",
            });
        }


        // ---------------------------------------------
        // CHECK SKILL EXISTS
        // ---------------------------------------------

        const existingSkill =
            await skillModel.getSkillById(id);

        if (!existingSkill) {

            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }


        // ---------------------------------------------
        // UPDATE SKILL
        // ---------------------------------------------

        const skill = await skillModel.updateSkill(
            id,
            {
                name: name.trim(),
                category: category.trim(),
                icon: icon?.trim() || null,
                description: description?.trim() || null,
                display_order: display_order || 0,
            }
        );


        res.status(200).json({
            success: true,
            message: "Skill updated successfully",
            data: skill,
        });

    } catch (error) {

        console.error("Update skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update skill",
        });
    }
};


// =====================================================
// DELETE SKILL
// ADMIN ONLY
// =====================================================

const deleteSkill = async (req, res) => {

    try {

        const { id } = req.params;

        const skill =
            await skillModel.deleteSkill(id);


        if (!skill) {

            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }


        res.status(200).json({
            success: true,
            message: "Skill deleted successfully",
            data: skill,
        });

    } catch (error) {

        console.error("Delete skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete skill",
        });
    }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
};