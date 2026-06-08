const express =
  require("express");

const router =
  express.Router();

const {
  getPatientProfile,
  updatePatientProfile,
} = require(
  "../controllers/patient.controller"
);

const {
  protect,
} = require(
  "../middleware/auth.middleware"
);

/* GET PROFILE */

router.get(
  "/profile",
  protect,
  getPatientProfile
);

/* UPDATE PROFILE */

router.put(
  "/profile",
  protect,
  updatePatientProfile
);

module.exports = router;