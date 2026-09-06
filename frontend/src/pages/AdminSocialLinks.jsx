import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaLink,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import DeleteConfirmation from "../components/DeleteConfirmation";

import {
  getAdminSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../services/socialService";

import "./AdminSocialLinks.css";

const AdminSocialLinks = () => {
  const { token } = useAuth();

  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [socialLinkToDelete, setSocialLinkToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      platform: "",
      url: "",
      icon: "",
      display_order: 0,
      is_active: true,
    },
  });

  const loadSocialLinks = async () => {
    try {
      setLoading(true);

      const result = await getAdminSocialLinks(token);

      setSocialLinks(result.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to load social links",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialSocialLinks = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await getAdminSocialLinks(token);

        if (!cancelled) {
          setSocialLinks(result.data || []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          toast.error(
            error.response?.data?.message || "Failed to load social links",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialSocialLinks();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const openAddModal = () => {
    setEditingId(null);

    reset({
      platform: "",
      url: "",
      icon: "",
      display_order: 0,
      is_active: true,
    });

    setShowModal(true);
  };

  const openEditModal = (socialLink) => {
    setEditingId(socialLink.id);

    reset({
      platform: socialLink.platform || "",
      url: socialLink.url || "",
      icon: socialLink.icon || "",
      display_order: socialLink.display_order || 0,
      is_active: socialLink.is_active !== false,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await updateSocialLink(editingId, data, token);

        toast.success("Social link updated successfully");
      } else {
        await createSocialLink(data, token);

        toast.success("Social link created successfully");
      }

      closeModal();
      await loadSocialLinks();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await deleteSocialLink(id, token);

      setSocialLinks((current) => current.filter((item) => item.id !== id));

      toast.success("Social link deleted successfully");
      setSocialLinkToDelete(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete social link",
      );
    } finally {
      setDeleting(false);
    }
  };

  const getIcon = (icon) => {
    switch (icon?.toLowerCase()) {
      case "github":
        return <FaGithub />;

      case "linkedin":
        return <FaLinkedin />;

      case "facebook":
        return <FaFacebook />;

      case "instagram":
        return <FaInstagram />;

      case "youtube":
        return <FaYoutube />;

      case "email":
        return <FaEnvelope />;

      default:
        return <FaLink />;
    }
  };

  if (loading) {
    return (
      <div className="admin-social-page">
        <div className="admin-social-loading">Loading social links...</div>
      </div>
    );
  }

  return (
    <div className="admin-social-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-page-eyebrow">PORTFOLIO SETTINGS</span>

          <h1>Social Links</h1>

          <p>
            Manage the social media and contact links displayed on your
            portfolio.
          </p>
        </div>

        <button className="social-add-button" onClick={openAddModal}>
          <FaPlus />
          Add Social Link
        </button>
      </div>

      <div className="social-summary">
        <strong>{socialLinks.length}</strong>

        <span>Total Social Links</span>
      </div>

      {socialLinks.length === 0 ? (
        <div className="social-empty">
          <FaLink />

          <h2>No social links</h2>

          <p>Add your first social link to display it on your portfolio.</p>

          <button onClick={openAddModal} className="social-add-button">
            <FaPlus />
            Add Social Link
          </button>
        </div>
      ) : (
        <div className="social-grid">
          {socialLinks.map((socialLink) => (
            <div className="social-card" key={socialLink.id}>
              <div className="social-card-top">
                <div className="social-icon">{getIcon(socialLink.icon)}</div>

                <div className="social-card-info">
                  <h3>{socialLink.platform}</h3>

                  <span>{socialLink.icon || "custom"}</span>
                </div>

                <span
                  className={
                    socialLink.is_active ? "social-active" : "social-inactive"
                  }
                >
                  {socialLink.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <a
                href={socialLink.url}
                target="_blank"
                rel="noreferrer"
                className="social-url"
              >
                {socialLink.url}
              </a>

              <div className="social-card-meta">
                <span>Order: {socialLink.display_order}</span>
              </div>

              <div className="social-card-actions">
                <button
                  onClick={() => openEditModal(socialLink)}
                  className="social-edit-button"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => setSocialLinkToDelete(socialLink)}
                  className="social-delete-button"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="social-modal-overlay" onClick={closeModal}>
          <div
            className="social-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="social-modal-header">
              <div>
                <span>{editingId ? "EDIT LINK" : "NEW LINK"}</span>

                <h2>{editingId ? "Edit Social Link" : "Add Social Link"}</h2>
              </div>

              <button onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="social-form-body">
                <div className="social-form-group">
                  <label>Platform *</label>

                  <input
                    type="text"
                    placeholder="GitHub"
                    {...register("platform", {
                      required: "Platform is required",
                    })}
                  />

                  {errors.platform && <small>{errors.platform.message}</small>}
                </div>

                <div className="social-form-group">
                  <label>URL *</label>

                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    {...register("url", {
                      required: "URL is required",
                      validate: (value) => {
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

                  {errors.url && <small>{errors.url.message}</small>}
                </div>

                <div className="social-form-row">
                  <div className="social-form-group">
                    <label>Icon</label>

                    <select {...register("icon")}>
                      <option value="">Select icon</option>

                      <option value="github">GitHub</option>

                      <option value="linkedin">LinkedIn</option>

                      <option value="facebook">Facebook</option>

                      <option value="instagram">Instagram</option>

                      <option value="youtube">YouTube</option>

                      <option value="email">Email</option>
                    </select>
                  </div>

                  <div className="social-form-group">
                    <label>Display Order</label>

                    <input
                      type="number"
                      min="0"
                      {...register("display_order", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>

                <label className="social-checkbox">
                  <input type="checkbox" {...register("is_active")} />

                  <span>Active</span>
                </label>
              </div>

              <div className="social-modal-footer">
                <button
                  type="button"
                  onClick={closeModal}
                  className="social-cancel-button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="social-save-button"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingId
                      ? "Update Link"
                      : "Create Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(socialLinkToDelete)}
        itemName={socialLinkToDelete?.platform || "this social link"}
        itemType="Social Link"
        deleting={deleting}
        onCancel={() => setSocialLinkToDelete(null)}
        onConfirm={() => handleDelete(socialLinkToDelete.id)}
      />
    </div>
  );
};

export default AdminSocialLinks;
