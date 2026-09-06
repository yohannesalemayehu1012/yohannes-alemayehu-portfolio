import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { getProjectBySlug } from "../services/projectService";
import { getErrorMessage } from "../utils/errorHandler";
import SEO from "../components/SEO";

const ProjectDetails = () => {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getProjectBySlug(slug);

        if (result.success) {
          setProject(result.data);
        } else {
          setError(result.message || "Project not found.");
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError(getErrorMessage(err, "Unable to load project."));
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <section className="project-details-page">
        <div className="container project-details-state">
          <p>Loading project...</p>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="project-details-page">
        <div className="container project-details-state">
          <h2>Project Not Found</h2>
          <p>{error || "The requested project does not exist."}</p>

          <Link to="/" className="back-link">
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="project-details-page">
      <SEO
        title={project.title}
        description={project.short_description}
        path={`/projects/${project.slug}`}
        image={project.image_url || "/og-image.svg"}
      />
      <div className="container">
        {/* Back */}
        <Link to="/" className="back-link">
          <FaArrowLeft />
          Back to Projects
        </Link>

        {/* Header */}
        <motion.div
          className="project-details-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="project-category">
            {project.category || "Project"}
          </span>

          <h1>{project.title}</h1>

          <p>{project.short_description}</p>

          {project.project_date && (
            <span className="project-date">
              {formatDate(project.project_date)}
            </span>
          )}
        </motion.div>

        {/* Image */}
        {project.image_url && (
          <motion.div
            className="project-details-image"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              src={project.image_url}
              alt={`${project.title} project screenshot`}
              width="1200"
              height="800"
            />
          </motion.div>
        )}

        {/* Content */}
        <div className="project-details-content">
          {project.description && (
            <motion.div
              className="project-detail-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>About the Project</h2>
              <p>{project.description}</p>
            </motion.div>
          )}

          {project.problem && (
            <motion.div
              className="project-detail-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>The Problem</h2>
              <p>{project.problem}</p>
            </motion.div>
          )}

          {project.solution && (
            <motion.div
              className="project-detail-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>The Solution</h2>
              <p>{project.solution}</p>
            </motion.div>
          )}

          {project.challenges && (
            <motion.div
              className="project-detail-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Challenges</h2>
              <p>{project.challenges}</p>
            </motion.div>
          )}

          {/* Technologies */}
          {project.technologies?.length > 0 && (
            <motion.div
              className="project-detail-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Technologies Used</h2>

              <div className="detail-technologies">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Links */}
          <div className="project-detail-actions">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-button"
              >
                <FaGithub />
                View on GitHub
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-button primary"
              >
                <FaExternalLinkAlt />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
