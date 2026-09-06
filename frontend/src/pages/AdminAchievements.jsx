import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTrophy,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../services/achievementService";

import useAuth from "../hooks/useAuth";
import DeleteConfirmation from "../components/DeleteConfirmation";

import "./AdminAchievements.css";

const AdminAchievements = () => {
  const { token } = useAuth();

  const [achievements, setAchievements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingAchievement, setEditingAchievement] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [achievementToDelete, setAchievementToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      achievement_date: "",
      image_url: "",
      link_url: "",
    },
  });

  // Load achievements
  const loadAchievements = async () => {
    try {
      setLoading(true);

      const result = await getAchievements();

      setAchievements(result.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialAchievements = async () => {
      try {
        const result = await getAchievements();

        if (!cancelled) {
          setAchievements(result.data || []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          toast.error("Failed to load achievements");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialAchievements();

    return () => {
      cancelled = true;
    };
  }, []);

  // Add
  const handleAdd = () => {
    setEditingAchievement(null);

    reset({
      title: "",
      description: "",
      achievement_date: "",
      image_url: "",
      link_url: "",
    });

    setModalOpen(true);
  };

  // Edit
  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);

    reset({
      title: achievement.title || "",

      description: achievement.description || "",

      achievement_date: achievement.achievement_date
        ? achievement.achievement_date.substring(0, 10)
        : "",

      image_url: achievement.image_url || "",

      link_url: achievement.link_url || "",
    });

    setModalOpen(true);
  };

  // Close modal
  const handleClose = () => {
    if (submitting) return;

    setModalOpen(false);

    setEditingAchievement(null);

    reset();
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const payload = {
        title: data.title,
        description: data.description,
        achievement_date: data.achievement_date || null,
        image_url: data.image_url,
        link_url: data.link_url,
      };

      if (editingAchievement) {
        await updateAchievement(editingAchievement.id, payload, token);

        toast.success("Achievement updated successfully");
      } else {
        await createAchievement(payload, token);

        toast.success("Achievement added successfully");
      }

      await loadAchievements();

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to save achievement",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await deleteAchievement(id, token);

      setAchievements((previous) =>
        previous.filter((achievement) => achievement.id !== id),
      );

      toast.success("Achievement deleted successfully");
      setAchievementToDelete(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to delete achievement",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="admin-achievements-page">
      {/* Header */}

      <div className="admin-page-header">
        <div>
          <span className="admin-page-label">PORTFOLIO MANAGEMENT</span>

          <h1>Achievements</h1>

          <p>
            Manage your awards, accomplishments, competitions and professional
            achievements.
          </p>
        </div>

        <button className="admin-primary-button" onClick={handleAdd}>
          <FaPlus />
          Add Achievement
        </button>
      </div>

      {/* Summary */}

      <div className="achievement-summary">
        <FaTrophy />

        <div>
          <strong>{achievements.length}</strong>

          <span>Achievements</span>
        </div>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="admin-state">Loading achievements...</div>
      ) : achievements.length === 0 ? (
        <div className="admin-state empty">
          <FaTrophy />

          <h3>No achievements yet</h3>

          <p>Add your first achievement to display it on your portfolio.</p>

          <button className="admin-primary-button" onClick={handleAdd}>
            <FaPlus />
            Add Achievement
          </button>
        </div>
      ) : (
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div className="achievement-card" key={achievement.id}>
              {/* Image */}

              {achievement.image_url ? (
                <div className="achievement-image">
                  <img src={achievement.image_url} alt={achievement.title} />
                </div>
              ) : (
                <div className="achievement-image-placeholder">
                  <FaTrophy />
                </div>
              )}

              {/* Content */}

              <div className="achievement-content">
                <div className="achievement-card-top">
                  <FaTrophy />

                  {achievement.achievement_date && (
                    <span>
                      {new Date(
                        achievement.achievement_date,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                <h2>{achievement.title}</h2>

                {achievement.description && <p>{achievement.description}</p>}

                {achievement.link_url && (
                  <a
                    href={achievement.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="achievement-link"
                  >
                    <FaExternalLinkAlt />
                    View Achievement
                  </a>
                )}

                {/* Actions */}

                <div className="achievement-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(achievement)}
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => setAchievementToDelete(achievement)}
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
          className="achievement-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="achievement-modal">
            {/* Modal header */}

            <div className="achievement-modal-header">
              <div>
                <span>ACHIEVEMENT</span>

                <h2>
                  {editingAchievement ? "Edit Achievement" : "Add Achievement"}
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
              className="achievement-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Title */}

              <div className="form-group">
                <label>Title *</label>

                <input
                  type="text"
                  placeholder="e.g. Hackathon Winner"
                  {...register("title", {
                    required: "Achievement title is required",
                    maxLength: {
                      value: 250,
                      message: "Title must not exceed 250 characters",
                    },
                  })}
                />

                {errors.title && <small>{errors.title.message}</small>}
              </div>

              {/* Date */}

              <div className="form-group">
                <label>Achievement Date</label>

                <input type="date" {...register("achievement_date")} />
              </div>

              {/* Image */}

              <div className="form-group">
                <label>Image URL</label>

                <input
                  type="url"
                  placeholder="https://example.com/achievement.jpg"
                  {...register("image_url")}
                  maxLength={2048}
                />
              </div>

              {/* Link */}

              <div className="form-group">
                <label>Achievement Link</label>

                <input
                  type="url"
                  placeholder="https://example.com/certificate"
                  {...register("link_url", {
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
                  maxLength={2048}
                />
              </div>

              {/* Description */}

              <div className="form-group">
                <label>Description</label>

                <textarea
                  rows="6"
                  placeholder="Describe this achievement..."
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
                    : editingAchievement
                      ? "Update Achievement"
                      : "Save Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(achievementToDelete)}
        itemName={achievementToDelete?.title || "this achievement"}
        itemType="Achievement"
        deleting={deleting}
        onCancel={() => setAchievementToDelete(null)}
        onConfirm={() => handleDelete(achievementToDelete.id)}
      />
    </div>
  );
};

export default AdminAchievements;
