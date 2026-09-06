import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSkills } from "../services/skillService";
import { getErrorMessage } from "../utils/errorHandler";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getSkills();

        if (!result.success) {
          throw new Error(result.message || "Unable to load skills.");
        }

        if (!cancelled) {
          setSkills(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);

        if (!cancelled) {
          setError(getErrorMessage(error, "Unable to load skills."));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSkills();

    return () => {
      cancelled = true;
    };
  }, []);

  const groupedSkills = skills.reduce((groups, skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }

    groups[skill.category].push(skill);

    return groups;
  }, {});

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">MY SKILLS</span>

          <h2 className="section-title">
            Technologies I<span> work with.</span>
          </h2>

          <p className="section-subtitle">
            A growing collection of technologies and tools that I use to build
            software solutions.
          </p>
        </div>

        {loading ? (
          <div className="skills-loading">Loading skills...</div>
        ) : error ? (
          <div className="error-state">
            <h3>Unable to load skills</h3>
            <p>{error}</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="empty-state">
            <p>No skills available yet.</p>
          </div>
        ) : (
          <div className="skills-grid">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <motion.div
                className="skill-category"
                key={category}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <h3>{category}</h3>

                <div className="skill-list">
                  {categorySkills.map((skill) => (
                    <div className="skill-item" key={skill.id}>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
