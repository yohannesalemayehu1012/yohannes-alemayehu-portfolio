import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { getExperiences } from "../services/experienceService";

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const result = await getExperiences();

                if (result.success) {
                    setExperiences(result.data);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch experiences:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    const getDateRange = (experience) => {
        const start = formatDate(experience.start_date);

        if (experience.current_position) {
            return `${start} - Present`;
        }

        const end = formatDate(experience.end_date);

        return `${start} - ${end}`;
    };

    return (
        <section id="experience" className="section experience-section">
            <div className="container">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">
                        MY JOURNEY
                    </span>

                    <h2 className="section-title">
                        Experience
                    </h2>

                    <p className="section-subtitle">
                        My professional and practical experience
                        developing software solutions and working
                        with modern technologies.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="experience-state">
                        <p>Loading experience...</p>
                    </div>
                ) : experiences.length === 0 ? (
                    <div className="experience-state">
                        <p>
                            Experience information will be
                            added soon.
                        </p>
                    </div>
                ) : (
                    <div className="experience-timeline">

                        {experiences.map((experience, index) => (
                            <motion.article
                                key={experience.id}
                                className="experience-item"
                                initial={{
                                    opacity: 0,
                                    x: index % 2 === 0 ? -30 : 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                            >
                                <div className="experience-marker">
                                    <FaBriefcase />
                                </div>

                                <div className="experience-card">

                                    <div className="experience-date">
                                        {getDateRange(experience)}
                                    </div>

                                    <h3>
                                        {experience.position}
                                    </h3>

                                    <h4>
                                        {experience.company}
                                    </h4>

                                    {experience.location && (
                                        <div className="experience-location">
                                            <FaMapMarkerAlt />
                                            <span>
                                                {experience.location}
                                            </span>
                                        </div>
                                    )}

                                    <p>
                                        {experience.description}
                                    </p>

                                </div>
                            </motion.article>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
};

export default Experience;