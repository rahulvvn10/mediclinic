const express = require("express");
const router = express.Router();

const {
  getAvailableSlots,
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  addPrescription,
} = require("../controllers/appointment.controller");

const { protect,authorize } = require("../middleware/auth.middleware");
const { setAvailability } = require("../controllers/doctor.controller");


router.get("/slots", getAvailableSlots);


router.post("/book", protect,authorize("patient"), bookAppointment);
router.get("/myappointments", protect,authorize("patient"), getMyAppointments);
router.post("/availability", protect,authorize("doctor"), setAvailability);
router.patch("/:id", protect,authorize("patient"), updateAppointmentStatus);
router.get("/doctor", protect,authorize("doctor"), getDoctorAppointments);
router.patch(
  "/:id/prescription",
  protect,
  authorize("doctor"),
  addPrescription);
module.exports = router;