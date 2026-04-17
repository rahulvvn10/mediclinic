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

module.exports = {
  createDoctorProfile,
  getDoctorProfile,
};