const {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../models/educationModel");

const validateEducationDates = (startDate, endDate, isCurrent) => {
  if (
    !isCurrent &&
    startDate &&
    endDate &&
    new Date(endDate) < new Date(startDate)
  ) {
    return "End date cannot be before start date";
  }
  return null;
};

// GET /api/education
const getEducation = async (req, res) => {
  try {
    const education = await getAllEducation();

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error("Get education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch education",
    });
  }
};

// GET /api/education/:id
const getEducationItem = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await getEducationById(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error("Get education item error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch education record",
    });
  }
};

// POST /api/education
const addEducation = async (req, res) => {
  try {
    const {
      institution,
      degree,
      department,
      description,
      start_date,
      end_date,
      current_education,
    } = req.body;

    // Required fields
    if (!institution || !institution.trim()) {
      return res.status(400).json({
        success: false,
        message: "Institution is required",
      });
    }

    if (!degree || !degree.trim()) {
      return res.status(400).json({
        success: false,
        message: "Degree is required",
      });
    }

    const isCurrent =
      current_education === true || current_education === "true";
    const dateError = validateEducationDates(start_date, end_date, isCurrent);

    if (dateError) {
      return res.status(400).json({ success: false, message: dateError });
    }

    const education = await createEducation({
      institution: institution.trim(),
      degree: degree.trim(),
      department: department?.trim() || null,
      description: description?.trim() || null,
      start_date: start_date || null,
      end_date: isCurrent ? null : end_date || null,
      current_education: isCurrent,
    });

    res.status(201).json({
      success: true,
      message: "Education added successfully",
      data: education,
    });
  } catch (error) {
    console.error("Add education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add education",
    });
  }
};

// PUT /api/education/:id
const editEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      institution,
      degree,
      department,
      description,
      start_date,
      end_date,
      current_education,
    } = req.body;

    if (!institution || !institution.trim()) {
      return res.status(400).json({
        success: false,
        message: "Institution is required",
      });
    }

    if (!degree || !degree.trim()) {
      return res.status(400).json({
        success: false,
        message: "Degree is required",
      });
    }

    const existingEducation = await getEducationById(id);

    if (!existingEducation) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    const isCurrent =
      current_education === true || current_education === "true";
    const dateError = validateEducationDates(start_date, end_date, isCurrent);

    if (dateError) {
      return res.status(400).json({ success: false, message: dateError });
    }

    const education = await updateEducation(id, {
      institution: institution.trim(),
      degree: degree.trim(),
      department: department?.trim() || null,
      description: description?.trim() || null,
      start_date: start_date || null,
      end_date: isCurrent ? null : end_date || null,
      current_education: isCurrent,
    });

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    console.error("Update education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update education",
    });
  }
};

// DELETE /api/education/:id
const removeEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await deleteEducation(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
      data: education,
    });
  } catch (error) {
    console.error("Delete education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete education",
    });
  }
};

module.exports = {
  getEducation,
  getEducationItem,
  addEducation,
  editEducation,
  removeEducation,
};
