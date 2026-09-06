import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaGraduationCap,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../services/educationService";

import useAuth from "../hooks/useAuth";
import DeleteConfirmation from "../components/DeleteConfirmation";

import "./AdminEducation.css";

const AdminEducation = () => {
  const { token } = useAuth();

  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      institution: "",
      degree: "",
      department: "",
      start_date: "",
      end_date: "",
      current_education: false,
      description: "",
    },
  });

  const isCurrent = useWatch({
    control,
    name: "current_education",
  });

  // Load education
  const loadEducation = async () => {
    try {
      setLoading(true);

      const result = await getEducation();

      setEducationList(result.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load education");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialEducation = async () => {
      try {
        const result = await getEducation();

        if (!cancelled) {
          setEducationList(result.data || []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          toast.error("Failed to load education");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialEducation();

    return () => {
      cancelled = true;
    };
  }, []);

  // Open add modal
  const handleAdd = () => {
    setEditingEducation(null);

    reset({
      institution: "",
      degree: "",
      department: "",
      start_date: "",
      end_date: "",
      current_education: false,
      description: "",
    });

    setModalOpen(true);
  };

  // Open edit modal
  const handleEdit = (education) => {
    setEditingEducation(education);

    reset({
      institution: education.institution || "",
      degree: education.degree || "",
      department: education.department || "",
      start_date: education.start_date
        ? education.start_date.substring(0, 10)
        : "",
      end_date: education.end_date ? education.end_date.substring(0, 10) : "",
      current_education: Boolean(education.current_education),
      description: education.description || "",
    });

    setModalOpen(true);
  };

  // Close modal
  const handleClose = () => {
    if (submitting) return;

    setModalOpen(false);
    setEditingEducation(null);
    reset();
  };

  // Submit
  const onSubmit = async (data) => {
    if (
      data.end_date &&
      data.start_date &&
      new Date(data.end_date) < new Date(data.start_date)
    ) {
      toast.error("End date cannot be before start date.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        institution: data.institution,
        degree: data.degree,
        department: data.department,
        start_date: data.start_date || null,
        end_date: data.current_education ? null : data.end_date || null,
        current_education: data.current_education === true,
        description: data.description,
      };

      if (editingEducation) {
        await updateEducation(editingEducation.id, payload, token);

        toast.success("Education updated successfully");
      } else {
        await createEducation(payload, token);

        toast.success("Education added successfully");
      }

      await loadEducation();

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save education");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await deleteEducation(id, token);

      setEducationList((previous) =>
        previous.filter((education) => education.id !== id),
      );

      toast.success("Education deleted successfully");
      setEducationToDelete(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to delete education",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="admin-education-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <span className="admin-page-label">PORTFOLIO MANAGEMENT</span>

          <h1>Education</h1>

          <p>Manage your academic background and educational history.</p>
        </div>

        <button className="admin-primary-button" onClick={handleAdd}>
          <FaPlus />
          Add Education
        </button>
      </div>

      {/* Summary */}
      <div className="education-summary">
        <FaGraduationCap />

        <div>
          <strong>{educationList.length}</strong>

          <span>Education Records</span>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="admin-state">Loading education...</div>
      ) : educationList.length === 0 ? (
        <div className="admin-state empty">
          <FaGraduationCap />

          <h3>No education records yet</h3>

          <p>
            Add your first education record to display it on your portfolio.
          </p>

          <button className="admin-primary-button" onClick={handleAdd}>
            <FaPlus />
            Add Education
          </button>
        </div>
      ) : (
        <div className="education-timeline">
          {educationList.map((education) => (
            <div className="education-card" key={education.id}>
              <div className="education-icon">
                <FaGraduationCap />
              </div>

              <div className="education-content">
                <div className="education-card-header">
                  <div>
                    <h2>{education.degree}</h2>

                    <h3>{education.institution}</h3>
                  </div>

                  {education.current_education && (
                    <span className="current-badge">Current</span>
                  )}
                </div>

                {education.department && (
                  <p className="education-department">{education.department}</p>
                )}

                <div className="education-dates">
                  {education.start_date && (
                    <span>
                      {new Date(education.start_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  )}

                  <span>—</span>

                  <span>
                    {education.current_education
                      ? "Present"
                      : education.end_date
                        ? new Date(education.end_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                  </span>
                </div>

                {education.description && (
                  <p className="education-description">
                    {education.description}
                  </p>
                )}

                <div className="education-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(education)}
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => setEducationToDelete(education)}
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
          className="education-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="education-modal">
            <div className="education-modal-header">
              <div>
                <span>EDUCATION</span>

                <h2>{editingEducation ? "Edit Education" : "Add Education"}</h2>
              </div>

              <button
                className="modal-close"
                onClick={handleClose}
                disabled={submitting}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="education-form">
              {/* Institution */}
              <div className="form-group">
                <label>Institution *</label>

                <input
                  type="text"
                  placeholder="e.g. Arba Minch University"
                  {...register("institution", {
                    required: "Institution is required",
                  })}
                />

                {errors.institution && (
                  <small>{errors.institution.message}</small>
                )}
              </div>

              {/* Degree */}
              <div className="form-group">
                <label>Degree *</label>

                <input
                  type="text"
                  placeholder="e.g. BSc Software Engineering"
                  {...register("degree", {
                    required: "Degree is required",
                  })}
                />

                {errors.degree && <small>{errors.degree.message}</small>}
              </div>

              {/* Department */}
              <div className="form-group">
                <label>Department</label>

                <input
                  type="text"
                  placeholder="e.g. Software Engineering"
                  {...register("department")}
                />
              </div>

              {/* Dates */}
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>

                  <input type="date" {...register("start_date")} />
                </div>

                {!isCurrent && (
                  <div className="form-group">
                    <label>End Date</label>

                    <input type="date" {...register("end_date")} />
                  </div>
                )}
              </div>

              {/* Current */}
              <label className="current-checkbox">
                <input type="checkbox" {...register("current_education")} />

                <span>I am currently studying here</span>
              </label>

              {/* Description */}
              <div className="form-group">
                <label>Description</label>

                <textarea
                  rows="5"
                  placeholder="Describe your education, studies, achievements, or specialization..."
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
                    : editingEducation
                      ? "Update Education"
                      : "Save Education"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(educationToDelete)}
        itemName={educationToDelete?.institution || "this education record"}
        itemType="Education"
        deleting={deleting}
        onCancel={() => setEducationToDelete(null)}
        onConfirm={() => handleDelete(educationToDelete.id)}
      />
    </div>
  );
};

export default AdminEducation;
