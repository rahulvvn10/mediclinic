import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../features/appointment/appointmentSlice";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const { doctorAppointments } =
    useSelector(
      (state) => state.appointment
    );

  useEffect(() => {
    dispatch(
      getDoctorAppointments(
        selectedDate
      )
    );
  }, [dispatch, selectedDate]);

  const handleComplete = (id) => {
    dispatch(
      updateAppointmentStatus({
        id,
        status: "completed",
      })
    )
      .unwrap()
      .then(() => {
        toast.success(
          "Appointment completed"
        );

        dispatch(
          getDoctorAppointments(
            selectedDate
          )
        );
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // Flatten appointments
  const allAppointments =
    Object.values(
      doctorAppointments?.slots || {}
    ).flat();

  // Current active appointment
  const currentAppointment =
    allAppointments.find(
      (a) =>
        a.status === "booked"
    );

  return (
    <div className="doctor-appointments-page">

      {/* HEADER */}
      <div className="appointments-header">

        <div>
          <h1>
            Appointments
          </h1>

          <p>
            Manage your daily
            consultations
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
        />

      </div>

      {/* CURRENT APPOINTMENT */}
      <div className="current-card">

        <h2>
          Current Appointment
        </h2>

        {currentAppointment ? (
          <>

            <h3>
              {
                currentAppointment
                  .patient.name
              }
            </h3>

            <p>
              Status:
              {" "}
              {
                currentAppointment.status
              }
            </p>

            <div className="current-actions">

              <button className="prescription-btn" onClick={() => navigate(`/doctor/${currentAppointment.id}/prescription`)}>
                Write Prescription
              </button>

              <button
                className="complete-btn"
                onClick={() =>
                  handleComplete(
                    currentAppointment.id
                  )
                }
              >
                Complete
              </button>

            </div>

          </>
        ) : (
          <p>
            No active appointments
          </p>
        )}

      </div>

      {/* SLOT LIST */}
      <div className="slots-list">

        {Object.entries(
          doctorAppointments?.slots ||
            {}
        ).map(
          ([time, patients]) => (
            <div
              key={time}
              className="slot-group"
            >

              <h3>{time}</h3>

              {patients.length ===
              0 ? (
                <p className="empty-slot">
                  No appointments
                </p>
              ) : (
                patients.map((p) => (
                  <div
                    key={p.id}
                    className="patient-card"
                  >

                    <div>

                      <h4>
                        {
                          p.patient
                            .name
                        }
                      </h4>

                      <p>
                        {
                          p.status
                        }
                      </p>

                    </div>

                    {p.status ===
                      "booked" && (
                      <button
                        onClick={() =>
                          handleComplete(
                            p.id
                          )
                        }
                      >
                        Complete
                      </button>
                    )}

                  </div>
                ))
              )}

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default DoctorAppointments;