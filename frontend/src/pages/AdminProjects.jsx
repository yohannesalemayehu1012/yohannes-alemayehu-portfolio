import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { getProjects, deleteProject } from "../services/projectService";

import "./AdminProjects.css";

const AdminProjects = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const result = await getProjects();

      if (result.success) {
        setProjects(result.data || []);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);

      toast.error(error.response?.data?.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProjects();
  }, []);

  const handleDelete = async () => {
    if (!projectToDelete) {
      return;
    }

    try {
      setDeleting(true);

      const result = await deleteProject(projectToDelete.id, token);

      if (result.success) {
        toast.success("Project deleted successfully.");

        setProjects((currentProjects) =>
          currentProjects.filter(
            (project) => project.id !== projectToDelete.id,
          ),
        );

        setProjectToDelete(null);
      }
    } catch (error) {
      console.error("Delete project error:", error);

      toast.error(error.response?.data?.message || "Failed to delete project.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page-loading">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <span className="admin-page-label">PORTFOLIO MANAGEMENT</span>

          <h1>Projects</h1>

          <p>Create and manage the projects displayed on your portfolio.</p>
        </div>

        <button
          className="admin-primary-button"
          onClick={() => navigate("/admin/projects/new")}
        >
          <FaPlus />
          Add Project
        </button>
      </div>

      {/* Project Count */}
      <div className="admin-page-summary">
        <strong>{projects.length}</strong>
        <span>{projects.length === 1 ? " project" : " projects"}</span>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <div className="admin-empty-state">
          <h2>No projects yet</h2>

          <p>Start by adding your first portfolio project.</p>
        </div>
      ) : (
        <div className="admin-projects-grid">
          {projects.map((project) => (
            <article className="admin-project-card" key={project.id}>
              <div className="admin-project-card-header">
                <div>
                  <h2>{project.title}</h2>

                  <span className="project-category">
                    {project.category || "Uncategorized"}
                  </span>
                </div>

                {project.featured && (
                  <span className="featured-project">
                    <FaStar />
                    Featured
                  </span>
                )}
              </div>

              <p className="project-description">{project.short_description}</p>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="project-technologies">
                  {project.technologies.map((technology, index) => (
                    <span key={`${technology}-${index}`}>{technology}</span>
                  ))}
                </div>
              )}

              <div className="project-meta">
                <span>Slug: {project.slug}</span>

                {project.project_date && (
                  <span>
                    Date: {new Date(project.project_date).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div className="admin-project-actions">
                <button
                  className="admin-edit-button"
                  onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  className="admin-delete-button"
                  onClick={() => setProjectToDelete(project)}
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {projectToDelete && (
        <div
          className="project-delete-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deleting) {
              setProjectToDelete(null);
            }
          }}
        >
          <div
            className="project-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-delete-title"
          >
            <div className="project-delete-icon">
              <FaExclamationTriangle />
            </div>

            <div className="project-delete-content">
              <span className="project-delete-eyebrow">DELETE PROJECT</span>

              <h2 id="project-delete-title">Delete this project?</h2>

              <p>
                You are about to permanently delete
                <strong>{projectToDelete.title}</strong>. This action cannot be
                undone.
              </p>
            </div>

            <div className="project-delete-actions">
              <button
                type="button"
                className="project-delete-cancel"
                onClick={() => setProjectToDelete(null)}
                disabled={deleting}
              >
                Keep Project
              </button>

              <button
                type="button"
                className="project-delete-confirm"
                onClick={handleDelete}
                disabled={deleting}
              >
                <FaTrash />
                {deleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
