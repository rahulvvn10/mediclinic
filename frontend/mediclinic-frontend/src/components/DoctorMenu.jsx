import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

import {
  logoutUser,
} from "../features/auth/authSlice";

import toast from "react-hot-toast";

const DoctorMenu = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const { user } =
    useSelector(
      (state) => state.auth
    );

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef(null);

  /* CLOSE OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (
      e
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

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
    <div
      className="doctor-menu"
      ref={menuRef}
    >

      <button
        className="doctor-menu-btn"
        onClick={() =>
          setOpen(!open)
        }
      >

        <div className="doctor-avatar">
          {user?.name?.charAt(0)}
        </div>

        <span>
          Dr. {user?.name}
        </span>

        <ChevronDown
          size={18}
        />

      </button>

      {open && (
        <div className="doctor-dropdown">

          <button
            onClick={() => {
              navigate(
                "/doctor/profile"
              );

              setOpen(false);
            }}
          >
            <User size={16} />
            Profile
          </button>

          <button
            onClick={
              handleLogout
            }
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      )}

    </div>
  );
};

export default DoctorMenu;