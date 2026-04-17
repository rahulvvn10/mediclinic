const express = require("express");
const { getDoctors } = require("../controllers/doctor.public.controller");

const router = express.Router();


router.get("/doctors", getDoctors);

module.exports = router;