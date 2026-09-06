const {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../models/experienceModel");

const validateDates = (startDate, endDate, isCurrent) => {
  if (!startDate) return "Start date is required";
  if (!isCurrent && endDate && new Date(endDate) < new Date(startDate)) {
    return "End date cannot be before start date";
  }
  return null;
};

// ==========================================
// GET ALL EXPERIENCE
// ==========================================

const getExperience = async (req, res) => {
  try {
    const experience = await getAllExperience();

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error("Get experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch experience",
    });
  }
};

// ==========================================
// GET EXPERIENCE BY ID
// ==========================================

const getExperienceItem = async (req, res) => {
  try {
    const experience = await getExperienceById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error("Get experience item error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch experience",
    });
  }
};

// ==========================================
// CREATE EXPERIENCE
// ==========================================

const addExperience = async (req, res) => {
  try {
    const {
      company,
      position,
      description,
      start_date,
      end_date,
      current_position,
      location,
    } = req.body;

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company is required",
      });
    }

    if (!position || !position.trim()) {
      return res.status(400).json({
        success: false,
        message: "Position is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    const isCurrent = current_position === true || current_position === "true";
    const dateError = validateDates(start_date, end_date, isCurrent);

    if (dateError) {
      return res.status(400).json({
        success: false,
        message: dateError,
      });
    }

    // -----------------------------
    // CURRENT POSITION
    // -----------------------------

    const experience = await createExperience({
      company: company.trim(),

      position: position.trim(),

      description: description.trim(),

      start_date,

      end_date: isCurrent ? null : end_date,

      current_position: isCurrent,

      location: location?.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Create experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create experience",
    });
  }
};

// ==========================================
// UPDATE EXPERIENCE
// ==========================================

const editExperience = async (req, res) => {
  try {
    const {
      company,
      position,
      description,
      start_date,
      end_date,
      current_position,
      location,
    } = req.body;

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company is required",
      });
    }

    if (!position || !position.trim()) {
      return res.status(400).json({
        success: false,
        message: "Position is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    const isCurrent = current_position === true || current_position === "true";
    const dateError = validateDates(start_date, end_date, isCurrent);

    if (dateError) {
      return res.status(400).json({
        success: false,
        message: dateError,
      });
    }

    const experience = await updateExperience(req.params.id, {
      company: company.trim(),

      position: position.trim(),

      description: description.trim(),

      start_date,

      end_date: isCurrent ? null : end_date,

      current_position: isCurrent,

      location: location?.trim(),
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Update experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update experience",
    });
  }
};

// ==========================================
// DELETE EXPERIENCE
// ==========================================

const removeExperience = async (req, res) => {
  try {
    const experience = await deleteExperience(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};

module.exports = {
  getExperience,
  getExperienceItem,
  addExperience,
  editExperience,
  removeExperience,
};
