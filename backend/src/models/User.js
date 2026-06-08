const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  phone: String,
  address: String,
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
  },
  specialization: {
  type: String,
},

experience: {
  type: Number, // years
},

qualification: {
  type: String,
},

bio: {
  type: String,
},

clinicDetails: {
  clinicName: String,
  address: String,
  city: String,
  contactNumber: String,
},

profileCompleted: {
  type: Boolean,
  default: false,
},

  isApproved: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  availability: {
  startTime: String,
  endTime: String,
  maxPatientsPerHour: Number,
},
  resetPasswordToken: String,
resetPasswordExpires: Date,

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);