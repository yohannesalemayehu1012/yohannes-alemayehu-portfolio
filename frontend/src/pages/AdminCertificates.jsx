import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCertificate,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "../services/certificateService";

import useAuth from "../hooks/useAuth";
import DeleteConfirmation from "../components/DeleteConfirmation";

import "./AdminCertificates.css";

const AdminCertificates = () => {
  const { token } = useAuth();

  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingCertificate, setEditingCertificate] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      issuer: "",
      description: "",
      issue_date: "",
      credential_id: "",
      credential_url: "",
      image_url: "",
    },
  });

  // Load certificates
  const loadCertificates = async () => {
    try {
      setLoading(true);

      const result = await getCertificates();

      setCertificates(result.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialCertificates = async () => {
      try {
        const result = await getCertificates();

        if (!cancelled) {
          setCertificates(result.data || []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          toast.error("Failed to load certificates");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialCertificates();

    return () => {
      cancelled = true;
    };
  }, []);

  // Add
  const handleAdd = () => {
    setEditingCertificate(null);

    reset({
      title: "",
      issuer: "",
      description: "",
      issue_date: "",
      credential_id: "",
      credential_url: "",
      image_url: "",
    });

    setModalOpen(true);
  };

  // Edit
  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);

    reset({
      title: certificate.title || "",

      issuer: certificate.issuer || "",

      description: certificate.description || "",

      issue_date: certificate.issue_date
        ? certificate.issue_date.substring(0, 10)
        : "",

      credential_id: certificate.credential_id || "",

      credential_url: certificate.credential_url || "",

      image_url: certificate.image_url || "",
    });

    setModalOpen(true);
  };

  // Close modal
  const handleClose = () => {
    if (submitting) return;

    setModalOpen(false);

    setEditingCertificate(null);

    reset();
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const payload = {
        title: data.title,
        issuer: data.issuer,
        description: data.description,
        issue_date: data.issue_date || null,
        credential_id: data.credential_id,
        credential_url: data.credential_url,
        image_url: data.image_url,
      };

      if (editingCertificate) {
        await updateCertificate(editingCertificate.id, payload, token);

        toast.success("Certificate updated successfully");
      } else {
        await createCertificate(payload, token);

        toast.success("Certificate added successfully");
      }

      await loadCertificates();

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to save certificate",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await deleteCertificate(id, token);

      setCertificates((previous) =>
        previous.filter((certificate) => certificate.id !== id),
      );

      toast.success("Certificate deleted successfully");
      setCertificateToDelete(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to delete certificate",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="admin-certificates-page">
      {/* Header */}

      <div className="admin-page-header">
        <div>
          <span className="admin-page-label">PORTFOLIO MANAGEMENT</span>

          <h1>Certificates</h1>

          <p>
            Manage your professional certificates, credentials and
            certifications.
          </p>
        </div>

        <button className="admin-primary-button" onClick={handleAdd}>
          <FaPlus />
          Add Certificate
        </button>
      </div>

      {/* Summary */}

      <div className="certificate-summary">
        <FaCertificate />

        <div>
          <strong>{certificates.length}</strong>

          <span>Certificates</span>
        </div>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="admin-state">Loading certificates...</div>
      ) : certificates.length === 0 ? (
        <div className="admin-state empty">
          <FaCertificate />

          <h3>No certificates yet</h3>

          <p>Add your first certificate to display it on your portfolio.</p>

          <button className="admin-primary-button" onClick={handleAdd}>
            <FaPlus />
            Add Certificate
          </button>
        </div>
      ) : (
        <div className="certificates-grid">
          {certificates.map((certificate) => (
            <div className="certificate-card" key={certificate.id}>
              {/* Image */}

              {certificate.image_url ? (
                <div className="certificate-image">
                  <img src={certificate.image_url} alt={certificate.title} />
                </div>
              ) : (
                <div className="certificate-image-placeholder">
                  <FaCertificate />
                </div>
              )}

              {/* Content */}

              <div className="certificate-content">
                <div className="certificate-card-top">
                  <FaCertificate />

                  {certificate.issue_date && (
                    <span>
                      {new Date(certificate.issue_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  )}
                </div>

                <h2>{certificate.title}</h2>

                <h3>{certificate.issuer}</h3>

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
                    <FaExternalLinkAlt />
                    Verify Credential
                  </a>
                )}

                {/* Actions */}

                <div className="certificate-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(certificate)}
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => setCertificateToDelete(certificate)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}

      {modalOpen && (
        <div
          className="certificate-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="certificate-modal">
            {/* Header */}

            <div className="certificate-modal-header">
              <div>
                <span>CERTIFICATE</span>

                <h2>
                  {editingCertificate ? "Edit Certificate" : "Add Certificate"}
                </h2>
              </div>

              <button
                className="modal-close"
                onClick={handleClose}
                disabled={submitting}
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}

            <form
              className="certificate-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Title */}

              <div className="form-group">
                <label>Certificate Title *</label>

                <input
                  type="text"
                  placeholder="e.g. Full Stack Web Development"
                  {...register("title", {
                    required: "Certificate title is required",
                    maxLength: {
                      value: 250,
                      message: "Title must not exceed 250 characters",
                    },
                  })}
                />

                {errors.title && <small>{errors.title.message}</small>}
              </div>

              {/* Issuer */}

              <div className="form-group">
                <label>Issuing Organization *</label>

                <input
                  type="text"
                  placeholder="e.g. Coursera"
                  {...register("issuer", {
                    required: "Issuing organization is required",
                    maxLength: {
                      value: 250,
                      message: "Issuer must not exceed 250 characters",
                    },
                  })}
                />

                {errors.issuer && <small>{errors.issuer.message}</small>}
              </div>

              {/* Date */}

              <div className="form-group">
                <label>Issue Date</label>

                <input type="date" {...register("issue_date")} />
              </div>

              {/* Credential ID */}

              <div className="form-group">
                <label>Credential ID</label>

                <input
                  type="text"
                  placeholder="e.g. ABC123XYZ"
                  {...register("credential_id")}
                />
              </div>

              {/* Credential URL */}

              <div className="form-group">
                <label>Credential URL</label>

                <input
                  type="url"
                  placeholder="https://example.com/verify"
                  {...register("credential_url", {
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

              {/* Image URL */}

              <div className="form-group">
                <label>Certificate Image URL</label>

                <input
                  type="url"
                  placeholder="https://example.com/certificate.jpg"
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

              {/* Description */}

              <div className="form-group">
                <label>Description</label>

                <textarea
                  rows="6"
                  placeholder="Describe what you learned or achieved through this certificate..."
                  {...register("description")}
                />
              </div>

              {/* Actions */}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleClose}
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : editingCertificate
                      ? "Update Certificate"
                      : "Save Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(certificateToDelete)}
        itemName={certificateToDelete?.title || "this certificate"}
        itemType="Certificate"
        deleting={deleting}
        onCancel={() => setCertificateToDelete(null)}
        onConfirm={() => handleDelete(certificateToDelete.id)}
      />
    </div>
  );
};

export default AdminCertificates;
