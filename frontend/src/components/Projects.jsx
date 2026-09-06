import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";

import { getProjects } from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();

        if (result.success) {
          setProjects(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);

        setError("Unable to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">MY WORK</span>

          <h2 className="section-title">
            Projects I've
            <span> built.</span>
          </h2>

          <p className="section-subtitle">
            A selection of projects where I applied software engineering,
            problem-solving, and modern development technologies.
          </p>
        </div>

        {loading && <div className="projects-status">Loading projects...</div>}

        {error && <div className="projects-status error">{error}</div>}

        {!loading && !error && projects.length === 0 && (
          <div className="projects-status">No projects available yet.</div>
        )}

        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <div className="project-image">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={`${project.title} project screenshot`}
                    width="1200"
                    height="800"
                    loading="lazy"
                  />
                ) : (
                  <div className="project-image-placeholder">
                    <span>{project.title}</span>
                  </div>
                )}

                {project.featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>

              <div className="project-content">
                {project.category && (
                  <span className="project-category">{project.category}</span>
                )}

                <h3>{project.title}</h3>

                <p>{project.short_description}</p>

                <div className="project-actions">
                  <a
                    href={`/projects/${project.slug}`}
                    className="project-details-link"
                  >
                    View Details
                    <FaArrowRight />
                  </a>

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <FaGithub />
                    </a>
                  )}

                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
