const express = require("express");
const {
  getPendingDoctors,
  approveDoctor,
  getAdminStats,
  getDoctorForApproval,
  rejectDoctor,
  getApprovedDoctors,
   deactivateDoctor,
  activateDoctor,
} = require("../controllers/admin.controller");

const { protect, authorize,adminOnly } = require("../middleware/auth.middleware");

const router = express.Router();

// Only admin can access
router.get("/pending-doctors", protect, authorize("admin"), getPendingDoctors);

router.put("/approve/:id", protect, authorize("admin"), approveDoctor);
router.get(
  "/stats",
  protect,
  adminOnly,
  getAdminStats
);
router.get(
  "/doctor/:id",
  protect,
  authorize("admin"),
  getDoctorForApproval
);
router.delete(
  "/reject/:id",
  protect,
  authorize("admin"),
  rejectDoctor
);
router.get(
  "/approved-doctors",
  protect,
  authorize("admin"),
  getApprovedDoctors
);

router.patch(
  "/deactivate/:id",
  protect,
  authorize("admin"),
  deactivateDoctor
);

router.patch(
  "/activate/:id",
  protect,
  authorize("admin"),
  activateDoctor
);
module.exports = router;