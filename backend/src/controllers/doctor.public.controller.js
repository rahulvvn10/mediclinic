const User = require("../models/User");

const getDoctors = async (req, res) => {
  try {
    const { specialization, city, search, sort } = req.query;

    let filter = {
      role: "doctor",
      isApproved: true,
      profileCompleted: true,
      isActive: true,
    };

    if (specialization) {
      filter.specialization = {
        $regex: specialization,
        $options: "i",
      };
    }

    if (city) {
      filter["clinicDetails.city"] = {
  $regex: city,
  $options: "i",
};
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
        { qualification: { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = {};
    if (sort === "experience") {
      sortOption.experience = -1;
    }

    const doctors = await User.find(filter)
      .select("-password")
      .sort(sortOption);

    res.json(doctors);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id)
      .select("-password");

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getDoctors,getDoctorById };