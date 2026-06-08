const express = require("express");
const {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctorProfile,
} = require("../controllers/doctor.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/profile", protect, authorize("doctor"), createDoctorProfile);

router.get("/me", protect, authorize("doctor"), getDoctorProfile);
router.put(
  "/profile",
  protect,
   authorize("doctor"),
  updateDoctorProfile
);
module.exports = router;