import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaExternalLinkAlt } from "react-icons/fa";
import { getAchievements } from "../services/achievementService";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const result = await getAchievements();

        if (result.success) {
          setAchievements(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">MILESTONES</span>

          <h2 className="section-title">Achievements</h2>

          <p className="section-subtitle">
            Highlights, milestones, and accomplishments from my academic and
            professional journey.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="achievement-state">
            <p>Loading achievements...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && achievements.length === 0 && (
          <div className="achievement-state">
            <p>Achievement information will be added soon.</p>
          </div>
        )}

        {/* Achievement Grid */}
        {!loading && achievements.length > 0 && (
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.article
                key={achievement.id}
                className="achievement-card"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                {/* Image */}
                {achievement.image_url ? (
                  <div className="achievement-image">
                    <img
                      src={achievement.image_url}
                      alt={achievement.title}
                      width="1200"
                      height="800"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="achievement-icon">
                    <FaTrophy />
                  </div>
                )}

                <div className="achievement-content">
                  {achievement.achievement_date && (
                    <span className="achievement-date">
                      {formatDate(achievement.achievement_date)}
                    </span>
                  )}

                  <h3>{achievement.title}</h3>

                  {achievement.description && <p>{achievement.description}</p>}

                  {achievement.link_url && (
                    <a
                      href={achievement.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="achievement-link"
                    >
                      View Achievement
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
