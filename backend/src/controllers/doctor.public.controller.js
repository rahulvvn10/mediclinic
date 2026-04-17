const User = require("../models/User");

const getDoctors = async (req, res) => {
  try {
    const { specialization, city, search, sort } = req.query;

   
    let filter = {
      role: "doctor",
      isApproved: true,
      profileCompleted: true,
    };

    
    if (specialization) {
      filter.specialization = specialization;
    }


    if (city) {
      filter["clinicDetails.city"] = city;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    
    let sortOption = {};
    if (sort === "experience") {
      sortOption.experience = -1; // highest first
    }

    const doctors = await User.find(filter)
      .select("-password")
      .sort(sortOption);

    res.json(doctors);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getDoctors };