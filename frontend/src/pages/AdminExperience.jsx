import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSave,
  FiMapPin,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../services/experienceService";

import useAuth from "../hooks/useAuth";
import DeleteConfirmation from "../components/DeleteConfirmation";

import "./AdminExperience.css";

const AdminExperience = () => {
  const { token } = useAuth();

  const [experience, setExperience] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceToDelete, setExperienceToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: "",
      position: "",
      description: "",
      start_date: "",
      end_date: "",
      current_position: false,
      location: "",
    },
  });

  const currentPosition = useWatch({
    control,
    name: "current_position",
  });

  // ==========================================
  // LOAD EXPERIENCE
  // ==========================================

  const loadExperience = async () => {
    try {
      setLoading(true);

      const response = await getExperience();

      setExperience(response.data || []);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load experience");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialExperience = async () => {
      try {
        const response = await getExperience();

        if (!cancelled) {
          setExperience(response.data || []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          toast.error(
            error.response?.data?.message || "Failed to load experience",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialExperience();

    return () => {
      cancelled = true;
    };
  }, []);

  // ==========================================
  // ADD
  // ==========================================

  const handleAdd = () => {
    setEditingExperience(null);

    reset({
      company: "",
      position: "",
      description: "",
      start_date: "",
      end_date: "",
      current_position: false,
      location: "",
    });

    setShowForm(true);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (item) => {
    setEditingExperience(item);

    reset({
      company: item.company || "",

      position: item.position || "",

      description: item.description || "",

      start_date: item.start_date ? item.start_date.substring(0, 10) : "",

      end_date: item.end_date ? item.end_date.substring(0, 10) : "",

      current_position: Boolean(item.current_position),

      location: item.location || "",
    });

    setShowForm(true);
  };

  // ==========================================
  // CLOSE
  // ==========================================

  const handleClose = () => {
    if (saving) {
      return;
    }

    setShowForm(false);

    setEditingExperience(null);

    reset();
  };

  // ==========================================
  // SUBMIT
  // ==========================================

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
      setSaving(true);

      const payload = {
        company: data.company.trim(),

        position: data.position.trim(),

        description: data.description.trim(),

        start_date: data.start_date,

        end_date: data.current_position ? null : data.end_date || null,

        current_position: Boolean(data.current_position),

        location: data.location?.trim() || "",
      };

      if (editingExperience) {
        await updateExperience(editingExperience.id, payload, token);

        toast.success("Experience updated successfully");
      } else {
        await createExperience(payload, token);

        toast.success("Experience created successfully");
      }

      await loadExperience();

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save experience");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (item) => {
    try {
      setDeleting(true);
      await deleteExperience(item.id, token);

      setExperience((current) =>
        current.filter((entry) => entry.id !== item.id),
      );

      toast.success("Experience deleted successfully");
      setExperienceToDelete(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to delete experience",
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-experience-loading">
        <p>Loading experience...</p>
      </div>
    );
  }

  return (
    <div className="admin-experience-page">
      {/* ==================================
                HEADER
            ================================== */}

      <div className="admin-experience-header">
        <div>
          <h1>Experience</h1>

          <p>Manage your professional experience and career history.</p>
        </div>

        <button className="admin-primary-button" onClick={handleAdd}>
          <FiPlus />
          Add Experience
        </button>
      </div>

      {/* ==================================
                SUMMARY
            ================================== */}

      <div className="experience-summary">
        <strong>{experience.length}</strong>

        <span>Experience Records</span>
      </div>

      {/* ==================================
                TIMELINE
            ================================== */}

      {experience.length === 0 ? (
        <div className="experience-empty">
          <h2>No experience yet</h2>

          <p>
            Add your professional experience to display it on your portfolio.
          </p>

          <button className="admin-primary-button" onClick={handleAdd}>
            <FiPlus />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="experience-timeline">
          {experience.map((item) => (
            <div className="experience-admin-card" key={item.id}>
              <div className="experience-timeline-dot"></div>

              <div className="experience-card-content">
                <div className="experience-card-header">
                  <div>
                    <span className="experience-position">{item.position}</span>

                    <h2>{item.company}</h2>
                  </div>

                  {item.current_position && (
                    <span className="current-badge">Current</span>
                  )}
                </div>

                <div className="experience-meta">
                  <span>
                    {new Date(item.start_date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}

                    {" — "}

                    {item.current_position
                      ? "Present"
                      : item.end_date
                        ? new Date(item.end_date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                  </span>

                  {item.location && (
                    <span>
                      <FiMapPin />

                      {item.location}
                    </span>
                  )}
                </div>

                <p className="experience-description">{item.description}</p>

                <div className="experience-card-actions">
                  <button
                    className="experience-edit-button"
                    onClick={() => handleEdit(item)}
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    className="experience-delete-button"
                    onClick={() => setExperienceToDelete(item)}
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================================
                MODAL
            ================================== */}

      {showForm && (
        <div
          className="experience-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="experience-modal">
            {/* HEADER */}

            <div className="experience-modal-header">
              <div>
                <h2>
                  {editingExperience ? "Edit Experience" : "Add Experience"}
                </h2>

                <p>
                  {editingExperience
                    ? "Update your experience information."
                    : "Add a professional experience record."}
                </p>
              </div>

              <button
                className="experience-close-button"
                onClick={handleClose}
                disabled={saving}
              >
                <FiX />
              </button>
            </div>

            {/* FORM */}

            <form className="experience-form" onSubmit={handleSubmit(onSubmit)}>
              {/* COMPANY */}

              <div className="experience-form-group">
                <label>Company *</label>

                <input
                  type="text"
                  placeholder="HexSoftwares"
                  {...register("company", {
                    required: "Company is required",
                  })}
                />

                {errors.company && (
                  <span className="experience-form-error">
                    {errors.company.message}
                  </span>
                )}
              </div>

              {/* POSITION */}

              <div className="experience-form-group">
                <label>Position *</label>

                <input
                  type="text"
                  placeholder="Full-Stack Developer Intern"
                  {...register("position", {
                    required: "Position is required",
                  })}
                />

                {errors.position && (
                  <span className="experience-form-error">
                    {errors.position.message}
                  </span>
                )}
              </div>

              {/* LOCATION */}

              <div className="experience-form-group">
                <label>Location</label>

                <input
                  type="text"
                  placeholder="Remote"
                  {...register("location")}
                />
              </div>

              {/* DATES */}

              <div className="experience-date-grid">
                <div className="experience-form-group">
                  <label>Start Date *</label>

                  <input
                    type="date"
                    {...register("start_date", {
                      required: "Start date is required",
                    })}
                  />

                  {errors.start_date && (
                    <span className="experience-form-error">
                      {errors.start_date.message}
                    </span>
                  )}
                </div>

                {!currentPosition && (
                  <div className="experience-form-group">
                    <label>End Date</label>

                    <input type="date" {...register("end_date")} />
                  </div>
                )}
              </div>

              {/* CURRENT POSITION */}

              <label className="current-position-checkbox">
                <input type="checkbox" {...register("current_position")} />

                <span>I currently work in this position</span>
              </label>

              {/* DESCRIPTION */}

              <div className="experience-form-group">
                <label>Description *</label>

                <textarea
                  rows="6"
                  placeholder="Describe your responsibilities, achievements and work..."
                  {...register("description", {
                    required: "Description is required",
                  })}
                />

                {errors.description && (
                  <span className="experience-form-error">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* ACTIONS */}

              <div className="experience-form-actions">
                <button
                  type="button"
                  className="experience-cancel-button"
                  onClick={handleClose}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="experience-save-button"
                  disabled={saving}
                >
                  <FiSave />

                  {saving
                    ? "Saving..."
                    : editingExperience
                      ? "Update Experience"
                      : "Create Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(experienceToDelete)}
        itemName={
          experienceToDelete
            ? `${experienceToDelete.position} at ${experienceToDelete.company}`
            : "this experience"
        }
        itemType="Experience"
        deleting={deleting}
        onCancel={() => setExperienceToDelete(null)}
        onConfirm={() => handleDelete(experienceToDelete)}
      />
    </div>
  );
};

export default AdminExperience;
