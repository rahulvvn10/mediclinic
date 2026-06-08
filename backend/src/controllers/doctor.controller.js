const User = require("../models/User");

// 👉 Create / Update Doctor Profile
const createDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      specialization,
      experience,
      qualification,
      bio,
      clinicDetails,
    } = req.body;

    const doctor = await User.findById(userId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(403).json({ message: "Not a doctor" });
    }

    doctor.specialization = specialization;
    doctor.experience = experience;
    doctor.qualification = qualification;
    doctor.bio = bio;
    doctor.clinicDetails = clinicDetails;
    doctor.profileCompleted = true;

    await doctor.save();

    res.json({ message: "Profile updated successfully", doctor });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const doctor = await User.findById(userId).select("-password");

    res.json(doctor);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateDoctorProfile = async (
  req,
  res
) => {
  try {
    const doctorId =
      req.user.id;

    const doctor =
      await User.findById(
        doctorId
      );

    if (!doctor) {
      return res
        .status(404)
        .json({
          message:
            "Doctor not found",
        });
    }

    doctor.name =
      req.body.name ||
      doctor.name;

    doctor.specialization =
      req.body.specialization ||
      doctor.specialization;

    doctor.qualification =
      req.body.qualification ||
      doctor.qualification;

    doctor.experience =
      req.body.experience ||
      doctor.experience;

    doctor.bio =
      req.body.bio ||
      doctor.bio;

    doctor.clinicDetails = {
      clinicName:
        req.body.clinicDetails
          ?.clinicName ||
        doctor
          .clinicDetails
          ?.clinicName,

      address:
        req.body.clinicDetails
          ?.address ||
        doctor
          .clinicDetails
          ?.address,

      city:
        req.body.clinicDetails
          ?.city ||
        doctor
          .clinicDetails
          ?.city,

      contactNumber:
        req.body.clinicDetails
          ?.contactNumber ||
        doctor
          .clinicDetails
          ?.contactNumber,
    };
    doctor.profileCompleted = true;
    await doctor.save();

    res.json(doctor);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const setAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const { startTime, endTime, maxPatientsPerHour } = req.body;

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(403).json({ message: "Not a doctor" });
    }

    doctor.availability = {
      startTime,
      endTime,
      maxPatientsPerHour,
    };

    await doctor.save();

    res.json({ message: "Availability updated", doctor });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createDoctorProfile,
  getDoctorProfile,
  setAvailability,
  updateDoctorProfile
};