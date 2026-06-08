const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String, 
      required: true,
    },

    status: {
      type: String,
      enum: ["booked", "completed", "cancelled","not_attended"],
      default: "booked",
    },
    availability: {
  startTime: {
    type: String, 
  },
  endTime: {
    type: String, 
  },
  maxPatientsPerHour: {
    type: Number,
    default: 10,
  },
},prescription: {
  diagnosis: {
    type: String,
  },

  medicines: [
    {
      name: String,

      dosage: String,

      duration: String,

      instructions: String,
    },
  ],

  notes: {
    type: String,
  },
  prescriptionUpdatedAt: Date,
},
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);