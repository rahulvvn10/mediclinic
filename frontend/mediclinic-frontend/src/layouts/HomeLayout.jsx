import React from "react";

import { Outlet } from "react-router-dom";

import HomeNavbar from "../components/HomeNavbar";

const HomeLayout = () => {
  return (
    <div className="main-layout">

      {/* NAVBAR */}
      <HomeNavbar />

      {/* PAGE CONTENT */}
      <main className="main-layout-content">
        <Outlet />
      </main>

    </div>
  );
};

export default HomeLayout;