import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getAdminStats,
} from "../features/admin/adminSlice";

const AdminDashboard =
  () => {

    const dispatch =
      useDispatch();

    const {
      stats,
      loading,
    } = useSelector(
      (state) =>
        state.admin
    );

    useEffect(() => {

      dispatch(
        getAdminStats()
      );

    }, [dispatch]);

    if (loading) {
      return (
        <h2>
          Loading...
        </h2>
      );
    }

    return (
      <div className="admin-dashboard">

        <h1>
          Admin Dashboard
        </h1>

        <div className="admin-grid">

          <div className="admin-card">
            <h3>
              Doctors
            </h3>
            <p>
              {
                stats?.totalDoctors
              }
            </p>
          </div>

          <div className="admin-card">
            <h3>
              Patients
            </h3>
            <p>
              {
                stats?.totalPatients
              }
            </p>
          </div>

          <div className="admin-card">
            <h3>
              Pending Doctors
            </h3>
            <p>
              {
                stats?.pendingDoctors
              }
            </p>
          </div>

          <div className="admin-card">
            <h3>
              Appointments
            </h3>
            <p>
              {
                stats?.totalAppointments
              }
            </p>
          </div>

        </div>

      </div>
    );
  };

export default
  AdminDashboard;