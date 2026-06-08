import React from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import {
  logoutUser,
} from "../features/auth/authSlice";

const AdminNavbar = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const handleLogout =
    () => {

      dispatch(
        logoutUser()
      );

      navigate(
        "/login"
      );
    };

  return (
    <nav className="admin-navbar">

      <div className="admin-logo">
        MediClinic Admin
      </div>

      <div className="admin-links">

        <NavLink
          to="/admin"
          end
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/pending-doctors"
        >
          Pending Doctors
        </NavLink>

        <NavLink
          to="/admin/doctors"
        >
          Doctors
        </NavLink>

        <button
          className="admin-logout-btn"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default AdminNavbar;