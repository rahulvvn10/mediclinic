import React from "react";

import { Outlet } from "react-router-dom";

import DoctorMenu from "../components/DoctorMenu";

const DoctorLayout = () => {
  return (
    <div className="doctor-layout">

      {/* TOP BAR */}
      <div className="doctor-layout-top">

        <h2 className="logo">
          Medi<span>Clinic</span>
        </h2>

        <DoctorMenu />

      </div>

      {/* PAGE CONTENT */}
      <div className="doctor-layout-content">
        <Outlet />
      </div>

    </div>
  );
};

export default DoctorLayout;