import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../features/appointment/appointmentSlice";
import { useNavigate } from "react-router-dom";


const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { availability } =
  useSelector(
    (state) => state.doctor
  );
  const { doctorAppointments } = useSelector((state) => state.appointment);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    dispatch(getDoctorAppointments(today));
  }, [dispatch, today]);

  const handleComplete = (id) => {
    dispatch(updateAppointmentStatus({ id, status: "completed" }))
      .unwrap()
      .then(() => {
        dispatch(getDoctorAppointments(today));
      });
  };
  const allAppointments =
  Object.values(
    doctorAppointments?.slots || {}
  ).flat();

const currentAppointment =
  allAppointments.find(
    (a) => a.status === "booked"
  );
const currentSlotBookings =
  currentAppointment
    ? doctorAppointments?.slots?.[
        currentAppointment.time
      ]?.length || 0
    : 0;
    const slotTimes = Object.keys(
  doctorAppointments?.slots || {}
);
    const startHour =
  slotTimes[0];

const lastSlot =
  slotTimes[
    slotTimes.length - 1
  ];

let endHour = "";

if (lastSlot) {
  const [hour, minute] =
    lastSlot.split(":");

  const nextHour =
    String(
      parseInt(hour) + 1
    ).padStart(2, "0");

  endHour =
    `${nextHour}:${minute}`;
}
  return (
    <div className="doctor-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome, Dr. {user?.name}</h1>
          <p>Manage your clinic efficiently</p>
        </div>

        <div className="status-badge">{user?.isActive ? "Active" : "Inactive"}</div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="dashboard-layout">

        {/* LEFT SIDE */}
        <div className="dashboard-main">

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card blue">
              <span>Today's Patients</span>
              <h2>{doctorAppointments?.total || 0}</h2>
            </div>

            <div className="stat-card purple">
              <span>Remaining Patients</span>
              <h2>{doctorAppointments?.booked || 0}</h2>
            </div>

            <div className="stat-card green">
              <span>Working hours</span>
              <h2>
  {(
  startHour
  )}{" "}
  -
  {" "}
  {(
    endHour
  )}
</h2>
            </div>
          </div>

          
        </div>

        {/* RIGHT SIDE */}
        <div className="dashboard-side">

          <div className="action-card" onClick={() => navigate("/doctor/availability")}>
            <h4>Set Availability</h4>
            <p>Control your schedule</p>
          </div>
 
          <div className="action-card" onClick={()=>navigate("/doctor/appointments")}>
            <h4>View Appointments</h4>
            <p>Manage bookings</p>
          </div>

          
          <div className="action-card" onClick={()=>navigate("/doctor/profile")}>
            <h4>Profile</h4>
            <p>Update information</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;