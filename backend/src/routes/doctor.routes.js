const express = require("express");
const {
  createDoctorProfile,
  getDoctorProfile,
} = require("../controllers/doctor.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// Only doctor can access
router.post("/profile", protect, authorize("doctor"), createDoctorProfile);

router.get("/me", protect, authorize("doctor"), getDoctorProfile);

module.exports = router;