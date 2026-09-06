import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  createProject,
  getProjectById,
  updateProject,
} from "../services/projectService";

import useAuth from "../hooks/useAuth";

import "./AdminProjectForm.css";

const AdminProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { token } = useAuth();

  const isEditMode = Boolean(id);

  const [loadingProject, setLoadingProject] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      short_description: "",
      description: "",
      problem: "",
      solution: "",
      challenges: "",
      image_url: "",
      github_url: "",
      live_url: "",
      category: "",
      featured: false,
      project_date: "",
      technologies: "",
    },
  });

  // ==========================================
  // LOAD PROJECT FOR EDITING
  // ==========================================
  useEffect(() => {
    const loadProject = async () => {
      if (!isEditMode) {
        return;
      }

      try {
        setLoadingProject(true);

        const response = await getProjectById(id);

        const project = response.data;

        reset({
          title: project.title || "",
          slug: project.slug || "",
          short_description: project.short_description || "",
          description: project.description || "",
          problem: project.problem || "",
          solution: project.solution || "",
          challenges: project.challenges || "",
          image_url: project.image_url || "",
          github_url: project.github_url || "",
          live_url: project.live_url || "",
          category: project.category || "",
          featured: project.featured || false,
          project_date: project.project_date
            ? project.project_date.substring(0, 10)
            : "",
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(", ")
            : "",
        });
      } catch (error) {
        console.error(error);

        toast.error(error.response?.data?.message || "Failed to load project");

        navigate("/admin/projects");
      } finally {
        setLoadingProject(false);
      }
    };

    loadProject();
  }, [id, isEditMode, reset, navigate]);

  // ==========================================
  // SUBMIT
  // ==========================================
  const onSubmit = async (formData) => {
    try {
      setSaving(true);

      const technologies = formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        featured: Boolean(formData.featured),
        technologies,
      };

      if (isEditMode) {
        await updateProject(id, payload, token);

        toast.success("Project updated successfully");
      } else {
        await createProject(payload, token);

        toast.success("Project created successfully");
      }

      navigate("/admin/projects");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  if (loadingProject) {
    return (
      <div className="admin-form-loading">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className="admin-project-form-page">
      {/* ======================================
                HEADER
            ====================================== */}

      <div className="admin-form-header">
        <div>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/admin/projects")}
          >
            <FiArrowLeft />
            Back to Projects
          </button>

          <h1>{isEditMode ? "Edit Project" : "Add Project"}</h1>

          <p>
            {isEditMode
              ? "Update your project information."
              : "Add a new project to your portfolio."}
          </p>
        </div>
      </div>

      {/* ======================================
                FORM
            ====================================== */}

      <form className="admin-project-form" onSubmit={handleSubmit(onSubmit)}>
        {/* BASIC INFORMATION */}

        <section className="form-section">
          <div className="form-section-title">
            <h2>Basic Information</h2>
            <p>Enter the main information about your project.</p>
          </div>

          <div className="form-grid">
            {/* TITLE */}

            <div className="form-group">
              <label>Project Title *</label>

              <input
                type="text"
                placeholder="School Management System"
                {...register("title", {
                  required: "Project title is required",
                  minLength: {
                    value: 3,
                    message: "Project title must be at least 3 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Project title must not exceed 200 characters",
                  },
                })}
              />

              {errors.title && (
                <span className="form-error">{errors.title.message}</span>
              )}
            </div>

            {/* SLUG */}

            <div className="form-group">
              <label>Slug *</label>

              <input
                type="text"
                placeholder="school-management-system"
                {...register("slug", {
                  required: "Slug is required",
                  pattern: {
                    value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    message: "Use lowercase letters, numbers and hyphens only",
                  },
                  minLength: {
                    value: 3,
                    message: "Slug must be at least 3 characters",
                  },
                })}
              />

              {errors.slug && (
                <span className="form-error">{errors.slug.message}</span>
              )}
            </div>

            {/* CATEGORY */}

            <div className="form-group">
              <label>Category *</label>

              <input
                type="text"
                placeholder="Full Stack"
                {...register("category", {
                  required: "Category is required",
                })}
              />

              {errors.category && (
                <span className="form-error">{errors.category.message}</span>
              )}
            </div>

            {/* DATE */}

            <div className="form-group">
              <label>Project Date</label>

              <input type="date" {...register("project_date")} />
            </div>
          </div>

          {/* SHORT DESCRIPTION */}

          <div className="form-group">
            <label>Short Description *</label>

            <textarea
              rows="3"
              placeholder="A full-stack platform for managing students, courses, examinations and academic records."
              {...register("short_description", {
                required: "Short description is required",
                maxLength: {
                  value: 500,
                  message: "Short description must not exceed 500 characters",
                },
              })}
            />

            {errors.short_description && (
              <span className="form-error">
                {errors.short_description.message}
              </span>
            )}
          </div>
        </section>

        {/* LINKS */}

        <section className="form-section">
          <div className="form-section-title">
            <h2>Project Links</h2>

            <p>Add links to the project resources.</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Image URL</label>

              <input
                type="url"
                placeholder="https://example.com/project-image.jpg"
                {...register("image_url", {
                  validate: (value) => {
                    if (!value.trim()) return true;
                    try {
                      const url = new URL(value);
                      return (
                        ["http:", "https:"].includes(url.protocol) ||
                        "Enter a valid URL."
                      );
                    } catch {
                      return "Enter a valid URL.";
                    }
                  },
                })}
              />
            </div>

            <div className="form-group">
              <label>GitHub URL</label>

              <input
                type="url"
                placeholder="https://github.com/username/project"
                {...register("github_url", {
                  validate: (value) => {
                    if (!value.trim()) return true;
                    try {
                      const url = new URL(value);
                      return (
                        ["http:", "https:"].includes(url.protocol) ||
                        "Enter a valid URL."
                      );
                    } catch {
                      return "Enter a valid URL.";
                    }
                  },
                })}
              />
            </div>

            <div className="form-group">
              <label>Live URL</label>

              <input
                type="url"
                placeholder="https://example.com"
                {...register("live_url", {
                  validate: (value) => {
                    if (!value.trim()) return true;
                    try {
                      const url = new URL(value);
                      return (
                        ["http:", "https:"].includes(url.protocol) ||
                        "Enter a valid URL."
                      );
                    } catch {
                      return "Enter a valid URL.";
                    }
                  },
                })}
              />
            </div>
          </div>
        </section>

        {/* TECHNOLOGIES */}

        <section className="form-section">
          <div className="form-section-title">
            <h2>Technologies</h2>

            <p>Separate technologies with commas.</p>
          </div>

          <div className="form-group">
            <label>Technologies *</label>

            <input
              type="text"
              placeholder="React, Node.js, PostgreSQL, JWT"
              {...register("technologies", {
                validate: (value) =>
                  value.split(",").some((technology) => technology.trim()) ||
                  "At least one technology is required",
              })}
            />

            <small>Example: React, Node.js, Express, PostgreSQL, JWT</small>

            {errors.technologies && (
              <span className="form-error">{errors.technologies.message}</span>
            )}
          </div>
        </section>

        {/* FEATURED */}

        <section className="form-section">
          <label className="featured-checkbox">
            <input type="checkbox" {...register("featured")} />

            <span>Mark this project as featured</span>
          </label>

          <p className="checkbox-help">
            Featured projects appear first in your portfolio.
          </p>
        </section>

        {/* CONTENT */}

        <section className="form-section">
          <div className="form-section-title">
            <h2>Project Details</h2>

            <p>Explain the project in more detail.</p>
          </div>

          {/* DESCRIPTION */}

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="7"
              placeholder="Explain what the project does..."
              {...register("description")}
            />
          </div>

          {/* PROBLEM */}

          <div className="form-group">
            <label>Problem</label>

            <textarea
              rows="6"
              placeholder="What problem does this project solve?"
              {...register("problem")}
            />
          </div>

          {/* SOLUTION */}

          <div className="form-group">
            <label>Solution</label>

            <textarea
              rows="6"
              placeholder="How did you solve the problem?"
              {...register("solution")}
            />
          </div>

          {/* CHALLENGES */}

          <div className="form-group">
            <label>Challenges</label>

            <textarea
              rows="6"
              placeholder="What challenges did you face?"
              {...register("challenges")}
            />
          </div>
        </section>

        {/* ACTIONS */}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin/projects")}
          >
            Cancel
          </button>

          <button type="submit" className="save-button" disabled={saving}>
            <FiSave />

            {saving
              ? "Saving..."
              : isEditMode
                ? "Update Project"
                : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectForm;
