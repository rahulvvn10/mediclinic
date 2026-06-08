const User = require("../models/User");

/* GET PROFILE */

const getPatientProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "Patient not found",
          });
      }

      res.json(user);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

/* UPDATE PROFILE */

const updatePatientProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "Patient not found",
          });
      }

      user.name =
        req.body.name ||
        user.name;

      user.email =
        req.body.email ||
        user.email;

      user.phone =
        req.body.phone ||
        user.phone;

      user.age =
        req.body.age ||
        user.age;

      user.gender =
        req.body.gender ||
        user.gender;

      user.address =
        req.body.address ||
        user.address;

      await user.save();

      res.json(user);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

module.exports = {
  getPatientProfile,
  updatePatientProfile,
};