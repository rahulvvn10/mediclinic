import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getMyAppointments,
  cancelAppointment,
} from "../features/appointment/appointmentSlice";

import toast from "react-hot-toast";

const AppointmentDetails = () => {
  const dispatch =
    useDispatch();
const navigate =useNavigate();
  const { id } =
    useParams();

  const {
    upcoming,
    history,
  } = useSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    dispatch(
      getMyAppointments()
    );
  }, [dispatch]);

  const appointments = [
    ...upcoming,
    ...history,
  ];

  const appointment =
    appointments.find(
      (a) => a._id === id
    );

  if (!appointment) {
    return (
      <div className="appointment-details-page">
        <h2>
          Appointment not found
        </h2>
      </div>
    );
  }

  const formatDate = (
    date
  ) => {
    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
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

  const handleCancel =
    () => {
      dispatch(
        cancelAppointment(
          appointment._id
        )
      )
        .unwrap()
        .then(() => {
          toast.success(
            "Appointment cancelled"
          );
          navigate("/patient/history");
        })
        .catch((err) => {
          toast.error(err);
        });
    };
    
  return (
    <div className="appointment-details-page">

      <div className="appointment-details-card">

        {/* HEADER */}

        <div className="details-header">

          <div>

            <h1>
              Dr.{" "}
              {
                appointment
                  .doctor
                  .name
              }
            </h1>

            <p>
              {
                appointment
                  .doctor
                  .specialization
              }
            </p>

          </div>

          <span
            className={`status ${appointment.status}`}
          >
            {
              appointment.status
            }
          </span>

        </div>

        {/* DETAILS */}

        <div className="details-grid">

          <div className="detail-box">
            <h4>
              Appointment Date
            </h4>

            <p>
              {formatDate(
                appointment.date
              )}
            </p>
          </div>

          <div className="detail-box">
            <h4>
              Appointment Time
            </h4>

            <p>
              {formatTime(
                appointment.time
              )}
            </p>
          </div>

          <div className="detail-box">
            <h4>
              Clinic
            </h4>

            <p>
  {
    appointment
      .doctor
      ?.clinicDetails
      ?.clinicName || "N/A"
  }
</p>

<p>
  {
    appointment
      .doctor
      ?.clinicDetails
      ?.address
  }
</p>

<p>
  {
    appointment
      .doctor
      ?.clinicDetails
      ?.city
  }
</p>

<p>
  📞{" "}
  {
    appointment
      .doctor
      ?.clinicDetails
      ?.contactNumber
  }
</p>
          </div>

        </div>

        {/* ACTION */}

        {appointment.status ===
          "booked" && (
          <button
            className="cancel-btn"
            onClick={
              handleCancel
            }
          >
            Cancel Appointment
          </button>
        )}
        {appointment.prescription && appointment.status === "completed" && (

  <button
    className="view-prescription-btn"
    onClick={(e) => {

      e.stopPropagation();

      navigate(
        `/patient/prescription/${appointment._id}`
      );
    }}
  >
    View Prescription
  </button>

)}

      </div>

    </div>
  );
};

export default AppointmentDetails;