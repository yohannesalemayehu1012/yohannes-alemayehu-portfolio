const express = require("express");

const router = express.Router();

const {
  getCertificates,
  getCertificateItem,
  addCertificate,
  editCertificate,
  removeCertificate,
} = require("../controllers/certificateController");

const { protect } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");
const validateId = require("../middleware/validateIdMiddleware");

// Public routes
router.get("/", getCertificates);

router.get("/:id", validateId, getCertificateItem);

// Protected admin routes
router.post("/", protect, requireAdmin, addCertificate);

router.put("/:id", validateId, protect, requireAdmin, editCertificate);

router.delete("/:id", validateId, protect, requireAdmin, removeCertificate);

module.exports = router;
