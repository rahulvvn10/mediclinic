import React from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Clock3,
  User,
  BarChart3,
  LogOut,
} from "lucide-react";

import {
  useDispatch,
} from "react-redux";

import {
  logoutUser,
} from "../features/auth/authSlice";

import toast from "react-hot-toast";

const DoctorNavbar = () => {
  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success(
          "Logged out"
        );

        navigate("/login");
      });
  };

  return (
    <div className="doctor-navbar">

      <div className="doctor-navbar-top">

        <h2>
          MediCare
        </h2>

        <p>
          Doctor Portal
        </p>

      </div>

      <div className="doctor-nav-links">

        <NavLink
          to="/doctor"
          end
          className="doctor-nav-link"
        >
          <LayoutDashboard
            size={20}
          />

          Dashboard
        </NavLink>

        <NavLink
          to="/doctor/appointments"
          className="doctor-nav-link"
        >
          <CalendarDays
            size={20}
          />

          Appointments
        </NavLink>

        <NavLink
          to="/doctor/availability"
          className="doctor-nav-link"
        >
          <Clock3 size={20} />

          Availability
        </NavLink>

        <NavLink
          to="/doctor/analytics"
          className="doctor-nav-link"
        >
          <BarChart3
            size={20}
          />

          Analytics
        </NavLink>

        <NavLink
          to="/doctor/profile"
          className="doctor-nav-link"
        >
          <User size={20} />

          Profile
        </NavLink>

      </div>

      <button
        className="doctor-logout-btn"
        onClick={handleLogout}
      >
        <LogOut size={18} />

        Logout
      </button>

    </div>
  );
};

export default DoctorNavbar;