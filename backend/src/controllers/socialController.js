const {
  getAllSocialLinks,
  getActiveSocialLinks,
  getSocialLinkById,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} = require("../models/socialModel");

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
};

// GET /api/social-links
// Public
const getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await getActiveSocialLinks();

    res.status(200).json({
      success: true,
      data: socialLinks,
    });
  } catch (error) {
    console.error("Get social links error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load social links",
    });
  }
};

// GET /api/social-links/admin
// Admin only
const getAdminSocialLinks = async (req, res) => {
  try {
    const socialLinks = await getAllSocialLinks();

    res.status(200).json({
      success: true,
      data: socialLinks,
    });
  } catch (error) {
    console.error("Get admin social links error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load social links",
    });
  }
};

// GET /api/social-links/:id
// Admin only
const getSocialLinkItem = async (req, res) => {
  try {
    const { id } = req.params;

    const socialLink = await getSocialLinkById(id);

    if (!socialLink) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    res.status(200).json({
      success: true,
      data: socialLink,
    });
  } catch (error) {
    console.error("Get social link error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load social link",
    });
  }
};

// POST /api/social-links
// Admin only
const addSocialLink = async (req, res) => {
  try {
    const { platform, url, icon, display_order, is_active } = req.body;

    if (!platform || !platform.trim()) {
      return res.status(400).json({
        success: false,
        message: "Platform is required",
      });
    }

    if (!url || !url.trim()) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    if (!isValidUrl(url.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid URL",
      });
    }

    const newSocialLink = await createSocialLink({
      platform: platform.trim(),
      url: url.trim(),
      icon: icon ? icon.trim().toLowerCase() : null,
      display_order: Number(display_order) || 0,
      is_active: is_active !== undefined ? Boolean(is_active) : true,
    });

    res.status(201).json({
      success: true,
      message: "Social link created successfully",
      data: newSocialLink,
    });
  } catch (error) {
    console.error("Create social link error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create social link",
    });
  }
};

// PUT /api/social-links/:id
// Admin only
const editSocialLink = async (req, res) => {
  try {
    const { id } = req.params;

    const { platform, url, icon, display_order, is_active } = req.body;

    if (!platform || !platform.trim()) {
      return res.status(400).json({
        success: false,
        message: "Platform is required",
      });
    }

    if (!url || !url.trim()) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    if (!isValidUrl(url.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid URL",
      });
    }

    const updatedSocialLink = await updateSocialLink(id, {
      platform: platform.trim(),
      url: url.trim(),
      icon: icon ? icon.trim().toLowerCase() : null,
      display_order: Number(display_order) || 0,
      is_active: is_active !== undefined ? Boolean(is_active) : true,
    });

    if (!updatedSocialLink) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Social link updated successfully",
      data: updatedSocialLink,
    });
  } catch (error) {
    console.error("Update social link error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update social link",
    });
  }
};

// DELETE /api/social-links/:id
// Admin only
const removeSocialLink = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSocialLink = await deleteSocialLink(id);

    if (!deletedSocialLink) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Social link deleted successfully",
      data: deletedSocialLink,
    });
  } catch (error) {
    console.error("Delete social link error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete social link",
    });
  }
};

module.exports = {
  getSocialLinks,
  getAdminSocialLinks,
  getSocialLinkItem,
  addSocialLink,
  editSocialLink,
  removeSocialLink,
};
