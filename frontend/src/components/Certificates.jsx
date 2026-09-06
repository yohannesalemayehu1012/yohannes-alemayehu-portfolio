import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import { getCertificates } from "../services/certificateService";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const result = await getCertificates();

        if (result.success) {
          setCertificates(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="certificates" className="section certificates-section">
      <div className="container">
        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">CREDENTIALS</span>

          <h2 className="section-title">Certificates</h2>

          <p className="section-subtitle">
            Professional certifications and courses that demonstrate my
            continuous learning and technical development.
          </p>
        </motion.div>

        {/* Loading */}

        {loading && (
          <div className="certificate-state">
            <p>Loading certificates...</p>
          </div>
        )}

        {/* Empty */}

        {!loading && certificates.length === 0 && (
          <div className="certificate-state">
            <p>Certificate information will be added soon.</p>
          </div>
        )}

        {/* Certificate Grid */}

        {!loading && certificates.length > 0 && (
          <div className="certificates-grid">
            {certificates.map((certificate, index) => (
              <motion.article
                key={certificate.id}
                className="certificate-card"
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
                {/* Certificate Image */}

                {certificate.image_url ? (
                  <div className="certificate-image">
                    <img
                      src={certificate.image_url}
                      alt={certificate.title}
                      width="1200"
                      height="800"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="certificate-icon">
                    <FaCertificate />
                  </div>
                )}

                <div className="certificate-content">
                  {certificate.issue_date && (
                    <span className="certificate-date">
                      {formatDate(certificate.issue_date)}
                    </span>
                  )}

                  <h3>{certificate.title}</h3>

                  <h4>{certificate.issuer}</h4>

                  {certificate.description && <p>{certificate.description}</p>}

                  {certificate.credential_id && (
                    <div className="credential-id">
                      <strong>Credential ID:</strong>

                      <span>{certificate.credential_id}</span>
                    </div>
                  )}

                  {certificate.credential_url && (
                    <a
                      href={certificate.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="certificate-link"
                    >
                      Verify Certificate
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

export default Certificates;
