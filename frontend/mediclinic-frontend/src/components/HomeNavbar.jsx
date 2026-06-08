import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice"; // if you have logout

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
     dispatch(logoutUser());
    console.log("logout");
    setOpen(false);
  };

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <h2 className="logo">
          Medi<span>Clinic</span>
        </h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
         {user && (
  <Link
    to={
      user.role === "doctor"
        ? "/doctor"
        : "/patient"
    }
  >
    Dashboard
  </Link>
)}
          <Link to="/register">Register</Link>

          {user ? (
            <div className="nav-user-wrapper">
              
              {/* CLICK AREA */}
              <div
                className="nav-user"
                onClick={() => setOpen(!open)}
              >
                <div className="nav-avatar">
                  {user.name.charAt(0)}
                </div>
                <span>{user.name}</span>
              </div>

              {/* DROPDOWN */}
              {open && (
                <div className="nav-dropdown">
                  <Link to="/patient/profile" onClick={() => setOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;