const express = require("express");
const {
  getPendingDoctors,
  approveDoctor,
} = require("../controllers/admin.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// Only admin can access
router.get("/doctors", protect, authorize("admin"), getPendingDoctors);

router.put("/approve/:id", protect, authorize("admin"), approveDoctor);

module.exports = router;