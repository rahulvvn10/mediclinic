const User = require("../models/User");

// 👉 Get all unapproved doctors
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

module.exports = {
  getPendingDoctors,
  approveDoctor,
};