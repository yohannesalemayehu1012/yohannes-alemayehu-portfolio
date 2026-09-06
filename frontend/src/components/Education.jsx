import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaGraduationCap,
    FaUniversity,
} from "react-icons/fa";
import { getEducations } from "../services/educationService";

const Education = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const result = await getEducations();

                if (result.success) {
                    setEducations(result.data);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch education:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEducations();
    }, []);

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    const getDateRange = (education) => {
        const start = formatDate(education.start_date);

        if (education.current_education) {
            return `${start} - Present`;
        }

        const end = formatDate(education.end_date);

        if (!start && !end) {
            return "";
        }

        return `${start} - ${end}`;
    };

    return (
        <section id="education" className="section education-section">
            <div className="container">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">
                        MY ACADEMIC JOURNEY
                    </span>

                    <h2 className="section-title">
                        Education
                    </h2>

                    <p className="section-subtitle">
                        My academic background and educational
                        journey in software engineering and
                        technology.
                    </p>
                </motion.div>

                {/* Loading */}
                {loading && (
                    <div className="education-state">
                        <p>Loading education...</p>
                    </div>
                )}

                {/* Empty */}
                {!loading && educations.length === 0 && (
                    <div className="education-state">
                        <p>
                            Education information will be
                            added soon.
                        </p>
                    </div>
                )}

                {/* Education Cards */}
                {!loading && educations.length > 0 && (
                    <div className="education-list">

                        {educations.map((education, index) => (
                            <motion.article
                                key={education.id}
                                className="education-card"
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
                                <div className="education-icon">
                                    <FaGraduationCap />
                                </div>

                                <div className="education-content">

                                    <div className="education-date">
                                        {getDateRange(education)}
                                    </div>

                                    <h3>
                                        {education.degree}
                                    </h3>

                                    <div className="education-institution">
                                        <FaUniversity />

                                        <span>
                                            {education.institution}
                                        </span>
                                    </div>

                                    {education.department && (
                                        <div className="education-department">
                                            {education.department}
                                        </div>
                                    )}

                                    {education.description && (
                                        <p>
                                            {education.description}
                                        </p>
                                    )}

                                    {education.current_education && (
                                        <span className="current-badge">
                                            Currently Studying
                                        </span>
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

export default Education;