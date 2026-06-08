import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMyAppointments } from "../features/appointment/appointmentSlice";

import {
  Search,
  FileText,
  History,
  User,
  Calendar,
} from "lucide-react";
const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();



const {
  upcoming,
} = useSelector(
  (state) =>
    state.appointment
);

const nextAppointment =
  upcoming?.[0];
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getMyAppointments());
}, [dispatch]);


  return (
    <div className="dashboard">

  <div className="dashboard-header">
    <div>
      <h1 className="dashboard-title">
        Welcome, {user?.name}
      </h1>
      <p className="dashboard-sub">
        Your health dashboard
      </p>
    </div>

    <div className="dashboard-badge">
      Patient
    </div>
  </div>

  <div className="dashboard-grid">

    {/* MAIN */}
    <div className="dashboard-main elite-card main-card">
      <div className="card-top">
        <Calendar size={20} />
        <h3>Upcoming Appointment</h3>
      </div>

      {nextAppointment ? (
        <div className="appointment-card">
          <h4>{nextAppointment.doctor.name}</h4>
          <p>{nextAppointment.doctor.specialization}</p>
          <p>{new Date(nextAppointment.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}</p>
          <p>{nextAppointment.time}</p>
          <span className="status">{nextAppointment.status}</span>
        </div>
      ) : (
        <p className="muted">No upcoming appointments</p>
      )}
    </div>

    {/* SIDE */}
    <div className="dashboard-side">

      <div onClick={() => navigate("/patient/doctors")} className="elite-card action">
        <div className="card-top">
          <Search size={18} />
          <h4>Find Doctors</h4>
        </div>
        <p>Search & book appointments</p>
      </div>

      

      <div onClick={() => navigate("/patient/history")} className="elite-card action">
        <div className="card-top">
          <History size={18} />
          <h4>Medical History</h4>
        </div>
        <p>Past records</p>
      </div>

      <div onClick={() => navigate("/patient/profile")} className="elite-card action">
        <div className="card-top">
          <User size={18} />
          <h4>Profile</h4>
        </div>
        <p>Your details</p>
      </div>

    </div>

  </div>
</div>
  );
};

export default PatientDashboard;