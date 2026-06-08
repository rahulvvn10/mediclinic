const Appointment = require("../models/Appointment");
const User = require("../models/User");
const generateHourSlots = require("../utils/hourSlots");

const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({
        message: "doctorId and date required",
      });
    }

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    if (
      !doctor.availability ||
      !doctor.availability.startTime
    ) {
      return res.status(400).json({
        message: "Doctor has not set availability",
      });
    }

    const {
      startTime,
      endTime,
      maxPatientsPerHour,
    } = doctor.availability;

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const hours = generateHourSlots(startTime, endTime);

    
    const now = new Date();

    const isToday =
      selectedDate.toDateString() === now.toDateString();

    let filteredHours = hours;

    if (isToday) {
      filteredHours = hours.filter((hour) => {
        const [h, m] = hour.split(":");

        const slotTime = new Date(selectedDate);

        slotTime.setHours(parseInt(h));
        slotTime.setMinutes(parseInt(m));
        slotTime.setSeconds(0);

        return slotTime > now;
      });
    }
    const appointments = await Appointment.find({
      doctor: doctorId,
      date: {
        $gte: selectedDate,
        $lt: nextDay,
      },
    });

    const countMap = {};
appointments.forEach((a) => {

  if (
    a.status ===
    "cancelled"
  ) {
    return;
  }

  countMap[a.time] =
    (countMap[a.time] || 0) + 1;
});

   
    const slots = filteredHours.map((hour) => {
      const booked = countMap[hour] || 0;

      return {
        time: hour,
        booked,
        available: maxPatientsPerHour - booked,
        isFull: booked >= maxPatientsPerHour,
      };
    });

    res.json(slots);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (!doctor.availability || !doctor.availability.maxPatientsPerHour) {
      return res.status(400).json({
        message: "Doctor has not set availability",
      });
    }

    const maxPatientsPerHour = doctor.availability.maxPatientsPerHour;

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const count = await Appointment.countDocuments({
      doctor: doctorId,
      time,
      date: { $gte: selectedDate, $lt: nextDay },
    });

    if (count >= maxPatientsPerHour) {
      return res.status(400).json({
        message: "This hour is fully booked",
      });
    }

    const existing = await Appointment.findOne({
      doctor: doctorId,
      patient: patientId,
      time,
      date: { $gte: selectedDate, $lt: nextDay },
    });

    if (existing) {
      return res.status(400).json({
        message: "You already booked this slot",
      });
    }

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date: selectedDate,
      time,
    });

    res.status(201).json(appointment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await Appointment.find({ patient: patientId })
      .populate("doctor", "name specialization clinicDetails")
      .sort({ date: 1, time: 1 });
      await markNotAttendedAppointments(
  appointments
);

   const upcoming = [];
const history = [];

const now = new Date();

appointments.forEach((a) => {

  const appointmentDate =
    new Date(a.date);

  const [h, m] =
    a.time.split(":");

  appointmentDate.setHours(
    parseInt(h)
  );

  appointmentDate.setMinutes(
    parseInt(m)
  );

  appointmentDate.setSeconds(0);

  if (
    appointmentDate > now &&
    a.status === "booked"
  ) {
    upcoming.push(a);
  } else {
    history.push(a);
  }
});
history.sort(
  (a, b) =>
    new Date(b.date) -
    new Date(a.date)
);

    res.json({ upcoming, history });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { date } = req.query;

    const doctor = await User.findById(doctorId);

    if (!doctor || !doctor.availability) {
      return res.status(400).json({
        message: "Doctor availability not set",
      });
    }

    const {
      startTime,
      endTime,
    } = doctor.availability;

    // Generate all slots
    const hours = generateHourSlots(
      startTime,
      endTime
    );

    // Selected date
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // Next day
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Get appointments
    const appointments = await Appointment.find({
      doctor: doctorId,
      date: {
        $gte: selectedDate,
        $lt: nextDay,
      },
    }).populate("patient", "name email");
    await markNotAttendedAppointments(
  appointments
);

    // Initialize slots
    const slots = {};

    hours.forEach((hour) => {
      slots[hour] = [];
    });

    let total = 0;
    let booked = 0;
    let completed = 0;
    let cancelled = 0;

    appointments.forEach((a) => {
      if (a.status !== "cancelled"){
      total++;}

      if (a.status === "completed") {
        completed++;
      } else if (a.status === "cancelled") {
        cancelled++;
      } else {
        booked++;
      }

      // Safety check
      if (!slots[a.time]) {
        slots[a.time] = [];
      }

     if (
  a.status !==
  "cancelled"
) {

  slots[a.time].push({
    id: a._id,
    patient: a.patient,
    status: a.status,
    time: a.time,
    date: a.date,
  });

}
    });

    res.json({
      total,
      booked,
      completed,
      cancelled,
      slots,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (!["completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (appointment.status === "completed") {
      return res.status(400).json({
        message: "Completed appointment cannot be modified",
      });
    }

    // Doctor → complete
    if (status === "completed") {
      if (appointment.doctor.toString() !== userId) {
        return res.status(403).json({
          message: "Only doctor can complete appointment",
        });
      }
    }

    // Patient → cancel
    if (status === "cancelled") {
      if (appointment.patient.toString() !== userId) {
        return res.status(403).json({
          message: "Only patient can cancel appointment",
        });
      }
    }

    appointment.status = status;

    await appointment.save();

    res.json({
      message: "Status updated",
      appointment,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const addPrescription =
  async (req, res) => {
    try {

      const appointment =
        await Appointment.findById(
          req.params.id
        );

      if (!appointment) {
        return res
          .status(404)
          .json({
            message:
              "Appointment not found",
          });
      }

      /* ONLY DOCTOR WHO OWNS APPOINTMENT */

      if (
        appointment.doctor.toString() !==
        req.user.id
      ) {
        return res
          .status(403)
          .json({
            message:
              "Unauthorized",
          });
      }

      const {
        diagnosis,
        medicines,
        notes,
      } = req.body;
if (
  !diagnosis ||
  !notes ||
  medicines.length === 0
) {
  return res.status(400).json({
    message:
      "Fill all prescription details",
  });
}
      appointment.prescription =
        {
          diagnosis,
          medicines,
          notes,
        };
appointment.prescriptionUpdatedAt =
  new Date();
      /* AUTO COMPLETE */

      appointment.status =
        "completed";
const now =
  new Date();

const appointmentDate =
  new Date(
    appointment.date
  );

const [h, m] =
  appointment.time.split(
    ":"
  );

appointmentDate.setHours(
  parseInt(h)
);

appointmentDate.setMinutes(
  parseInt(m)
);

appointmentDate.setSeconds(0);
const allowedTime =
  new Date(
    appointmentDate
  );

allowedTime.setMinutes(
  allowedTime.getMinutes() - 30
);

if (
  now < allowedTime
){
  return res.status(400).json({
    message:
      "Prescription can only be added during or after appointment time",
  });
}

      await appointment.save();

      res.json({
        message:
          "Prescription added",

        appointment,
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };
  const markNotAttendedAppointments =
  async (appointments) => {

    const now =
      new Date();

    for (const appointment of appointments) {

      if (
        appointment.status !==
        "booked"
      ) {
        continue;
      }

      const appointmentTime =
        new Date(
          appointment.date
        );

      const [h, m] =
        appointment.time.split(
          ":"
        );

      appointmentTime.setHours(
        parseInt(h)
      );

      appointmentTime.setMinutes(
        parseInt(m)
      );

      appointmentTime.setSeconds(
        0
      );

      const endOfDay =
        new Date(
          appointmentTime
        );

      endOfDay.setHours(
        23,
        59,
        59,
        999
      );

      if (
        now > endOfDay
      ) {

        appointment.status =
          "not_attended";

        await appointment.save();
      }
    }
  };
module.exports = {
  getAvailableSlots,
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  markNotAttendedAppointments,
  addPrescription,
};