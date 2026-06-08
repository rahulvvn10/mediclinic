import React, {
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
  getMyAppointments,
} from "../features/appointment/appointmentSlice";

const PatientHistory = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    upcoming,
    history,
    loadingAppointments,
  } = useSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    dispatch(
      getMyAppointments()
    );
  }, [dispatch]);

  const formatDate = (
    date
  ) => {
    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (
    time
  ) => {
    const [hour, minute] =
      time.split(":");

    const h =
      parseInt(hour);

    const suffix =
      h >= 12
        ? "PM"
        : "AM";

    const formattedHour =
      h % 12 || 12;

    return `${formattedHour}:${minute} ${suffix}`;
  };

  return (
    <div className="patient-history-page">

      <div className="history-header">

        <h1>
          Medical History
        </h1>

        <p>
          View all your appointments
        </p>

      </div>

      {/* LOADING */}

      {loadingAppointments && (
        <p>
          Loading...
        </p>
      )}

      {/* UPCOMING */}

      <div className="history-section">

        <h2>
          Upcoming Appointments
        </h2>

        <div className="history-grid">

          {upcoming.map((a) => (
            <div
              key={a._id}
              className="history-card upcoming"
              onClick={() =>
                navigate(
                  `/patient/history/${a._id}`
                )
              }
            >

              <div className="history-top">

                <div>
                  <h3>
                    Dr.{" "}
                    {
                      a.doctor
                        .name
                    }
                  </h3>

                  <p>
                    {
                      a
                        .doctor
                        .specialization
                    }
                  </p>
                </div>

                <span className="status booked">
                  {a.status}
                </span>

              </div>

              <div className="history-info">

                <p>
                  📅{" "}
                  {formatDate(
                    a.date
                  )}
                </p>

                <p>
                  ⏰{" "}
                  {formatTime(
                    a.time
                  )}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* HISTORY */}

      <div className="history-section">

        <h2>
          Past Appointments
        </h2>

        <div className="history-grid">

          {history.map((a) => (
            <div
              key={a._id}
              className="history-card"
              onClick={() =>
                navigate(
                  `/patient/history/${a._id}`
                )
              }
            >

              <div className="history-top">

                <div>

                  <h3>
                    Dr.{" "}
                    {
                      a.doctor
                        .name
                    }
                  </h3>

                  <p>
                    {
                      a
                        .doctor
                        .specialization
                    }
                  </p>

                </div>

                <span
                  className={`status ${a.status}`}
                >{
  a.status ===
  "not_attended"
    ? "Not Attended"
    : a.status
}
                  
                </span>

              </div>

              <div className="history-info">

                <p>
                  📅{" "}
                  {formatDate(
                    a.date
                  )}
                </p>

                <p>
                  ⏰{" "}
                  {formatTime(
                    a.time
                  )}
                  
                </p>
                

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default PatientHistory;