const express = require("express");
const { getDoctors } = require("../controllers/doctor.public.controller");
const { route } = require("./doctor.routes");
const { getDoctorProfile } = require("../controllers/doctor.controller");
const { getDoctorById } = require("../controllers/doctor.public.controller");
const router = express.Router();


router.get("/doctors", getDoctors);
router.get("/doctors/:id", getDoctorById);

module.exports = router;