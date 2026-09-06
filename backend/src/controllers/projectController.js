const {
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../models/projectModel");

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const validateProject = ({ title, slug, short_description, technologies }) => {
  if (!title || title.trim().length < 3 || title.trim().length > 200) {
    return "Title must be between 3 and 200 characters";
  }

  if (!slug || !slugRegex.test(slug.trim())) {
    return "Slug can contain lowercase letters, numbers, and hyphens only";
  }

  if (!short_description || short_description.trim().length > 500) {
    return "Short description is required and must not exceed 500 characters";
  }

  if (!Array.isArray(technologies) || technologies.length === 0) {
    return "At least one technology is required";
  }

  return null;
};

// =====================================================
// GET ALL PROJECTS
// PUBLIC
// =====================================================

const getProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// =====================================================
// GET PROJECT BY ID
// PUBLIC
// =====================================================

const getProjectByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Get project by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

// =====================================================
// GET PROJECT BY SLUG
// PUBLIC
// =====================================================

const getProjectBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await getProjectBySlug(slug);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Get project by slug error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

// =====================================================
// CREATE PROJECT
// ADMIN ONLY
// =====================================================

const createProjectController = async (req, res) => {
  try {
    const { title, slug, short_description } = req.body;

    // ---------------------------------------------
    // VALIDATION
    // ---------------------------------------------

    const validationError = validateProject(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // ---------------------------------------------
    // CREATE PROJECT
    // ---------------------------------------------

    const project = await createProject(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    // PostgreSQL duplicate value error
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A project with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

// =====================================================
// UPDATE PROJECT
// ADMIN ONLY
// =====================================================

const updateProjectController = async (req, res) => {
  try {
    const { id } = req.params;

    // ---------------------------------------------
    // CHECK PROJECT EXISTS
    // ---------------------------------------------

    const existingProject = await getProjectById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const validationError = validateProject(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // ---------------------------------------------
    // UPDATE PROJECT
    // ---------------------------------------------

    const project = await updateProject(id, req.body);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    // PostgreSQL duplicate value error
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A project with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// =====================================================
// DELETE PROJECT
// ADMIN ONLY
// =====================================================

const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await deleteProject(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};

// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {
  getProjects,

  getProjectById: getProjectByIdController,

  getProjectBySlug: getProjectBySlugController,

  createProject: createProjectController,

  updateProject: updateProjectController,

  deleteProject: deleteProjectController,
};
