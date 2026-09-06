import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../services/skillService";

import useAuth from "../hooks/useAuth";
import DeleteConfirmation from "../components/DeleteConfirmation";

import "./AdminSkills.css";

const emptyForm = {
  name: "",
  category: "",
  icon: "",
  description: "",
  display_order: 0,
};

const AdminSkills = () => {
  const { token } = useAuth();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadSkills = async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const response = await getSkills();

      if (response.success) {
        setSkills(response.data);
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialSkills = async () => {
      try {
        const response = await getSkills();

        if (!cancelled && response.success) {
          setSkills(response.data || []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          toast.error(error.response?.data?.message || "Failed to load skills");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialSkills();

    return () => {
      cancelled = true;
    };
  }, []);

  const openAddModal = () => {
    setEditingSkill(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);

    setForm({
      name: skill.name || "",
      category: skill.category || "",
      icon: skill.icon || "",
      description: skill.description || "",
      display_order: skill.display_order || 0,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingSkill(null);
    setForm(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Skill name is required");
      return;
    }

    if (form.name.trim().length > 100) {
      toast.error("Skill name must not exceed 100 characters");
      return;
    }

    if (!form.category.trim()) {
      toast.error("Skill category is required");
      return;
    }

    if (form.category.trim().length > 100) {
      toast.error("Skill category must not exceed 100 characters");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        display_order: Number(form.display_order) || 0,
      };

      if (editingSkill) {
        const response = await updateSkill(editingSkill.id, payload, token);

        if (response.success) {
          toast.success("Skill updated successfully");
          closeModal();
          await loadSkills();
        }
      } else {
        const response = await createSkill(payload, token);

        if (response.success) {
          toast.success("Skill created successfully");
          closeModal();
          await loadSkills();
        }
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (skill) => {
    try {
      setDeleting(true);
      const response = await deleteSkill(skill.id, token);

      if (response.success) {
        toast.success("Skill deleted successfully");
        await loadSkills();
        setSkillToDelete(null);
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete skill");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Skills</h1>

          <p>Manage the technologies and skills displayed on your portfolio.</p>
        </div>

        <button className="admin-primary-button" onClick={openAddModal}>
          <FiPlus />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className="admin-empty">
          <h3>No skills found</h3>

          <p>Add your first skill to display it on your portfolio.</p>
        </div>
      ) : (
        <div className="skills-admin-grid">
          {skills.map((skill) => (
            <div className="skill-admin-card" key={skill.id}>
              <div className="skill-admin-card-top">
                <div>
                  <span className="skill-category">{skill.category}</span>

                  <h3>{skill.name}</h3>
                </div>

                <span className="skill-order">#{skill.display_order}</span>
              </div>

              {skill.description && <p>{skill.description}</p>}

              {skill.icon && (
                <div className="skill-icon-name">Icon: {skill.icon}</div>
              )}

              <div className="skill-admin-actions">
                <button onClick={() => openEditModal(skill)}>
                  <FiEdit2 />
                  Edit
                </button>

                <button
                  className="delete-action"
                  onClick={() => setSkillToDelete(skill)}
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div>
                <h2>{editingSkill ? "Edit Skill" : "Add Skill"}</h2>

                <p>
                  {editingSkill
                    ? "Update skill information."
                    : "Add a new skill to your portfolio."}
                </p>
              </div>

              <button className="modal-close-button" onClick={closeModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Skill Name *</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="React.js"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label>Category *</label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Frontend"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label>Icon</label>

                <input
                  type="text"
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  placeholder="react"
                />
              </div>

              <div className="form-group">
                <label>Display Order</label>

                <input
                  type="number"
                  name="display_order"
                  value={form.display_order}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your skill..."
                />
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingSkill
                      ? "Update Skill"
                      : "Create Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(skillToDelete)}
        itemName={skillToDelete?.name || "this skill"}
        itemType="Skill"
        deleting={deleting}
        onCancel={() => setSkillToDelete(null)}
        onConfirm={() => handleDelete(skillToDelete)}
      />
    </div>
  );
};

export default AdminSkills;
