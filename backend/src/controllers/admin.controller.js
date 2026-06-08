const User = require("../models/User");
const Appointment =require(  "../models/Appointment");
const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await User.find({
      role: "doctor",
      isApproved: false,
      profileCompleted: true,
    }).select("-password");

    res.json(doctors);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getDoctorForApproval =
  async (req, res) => {

    try {

      const doctor =
        await User.findById(
          req.params.id
        ).select("-password");

      if (
        !doctor ||
        doctor.role !== "doctor"
      ) {
        return res
          .status(404)
          .json({
            message:
              "Doctor not found",
          });
      }

      res.json(doctor);

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };
// 👉 Approve doctor
const approveDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await User.findById(id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.isApproved = true;
    await doctor.save();

    res.json({ message: "Doctor approved successfully" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getAdminStats =
  async (req, res) => {

    try {

      const totalDoctors =
        await User.countDocuments({
          role: "doctor",
          isApproved: true,
        });

      const pendingDoctors =
        await User.countDocuments({
          role: "doctor",
          isApproved: false,
          profileCompleted: true,
        });

      const totalPatients =
        await User.countDocuments({
          role: "patient",
        });

      const totalAppointments =
        await Appointment.countDocuments();

      const completedAppointments =
        await Appointment.countDocuments({
          status: "completed",
        });

      const cancelledAppointments =
        await Appointment.countDocuments({
          status: "cancelled",
        });

      const notAttendedAppointments =
        await Appointment.countDocuments({
          status: "not_attended",
        });

      res.json({
        totalDoctors,
        pendingDoctors,
        totalPatients,
        totalAppointments,
        
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }
  };
  const rejectDoctor =
  async (req, res) => {

    try {

      const doctor =
        await User.findById(
          req.params.id
        );

      if (
        !doctor ||
        doctor.role !==
          "doctor"
      ) {
        return res
          .status(404)
          .json({
            message:
              "Doctor not found",
          });
      }

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Doctor rejected successfully",
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };
  const getApprovedDoctors =
  async (req, res) => {

    try {

      const doctors =
        await User.find({
          role: "doctor",
          isApproved: true,
        }).select("-password");

      res.json(doctors);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }
  };

const deactivateDoctor =
  async (req, res) => {

    try {

      const doctor =
        await User.findById(
          req.params.id
        );

      if (
        !doctor ||
        doctor.role !==
          "doctor"
      ) {
        return res
          .status(404)
          .json({
            message:
              "Doctor not found",
          });
      }

      doctor.isActive =
        false;

      await doctor.save();

      res.json({
        message:
          "Doctor deactivated",
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });

    }
  };

const activateDoctor =
  async (req, res) => {

    try {

      const doctor =
        await User.findById(
          req.params.id
        );

      if (
        !doctor ||
        doctor.role !==
          "doctor"
      ) {
        return res
          .status(404)
          .json({
            message:
              "Doctor not found",
          });
      }

      doctor.isActive =
        true;

      await doctor.save();

      res.json({
        message:
          "Doctor activated",
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });

    }
  };
module.exports = {
  getPendingDoctors,
  approveDoctor,
  getAdminStats,
  getDoctorForApproval,
  rejectDoctor,
  getApprovedDoctors,
    deactivateDoctor,
  activateDoctor,
};