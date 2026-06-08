import React from "react";

import {
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

const PatientPrescription = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    upcoming,
    history,
  } = useSelector(
    (state) =>
      state.appointment
  );

  const appointments = [
    ...upcoming,
    ...history,
  ];

  const appointment =
    appointments.find(
      (a) => a._id === id
    );

  if (
    !appointment ||
    !appointment.prescription
  ) {
    return (
      <div className="prescription-view-page">

        <h2>
          Prescription not found
        </h2>

      </div>
    );
  }

  const prescription =
    appointment.prescription;

  return (
    <div className="prescription-view-page">

      <div className="prescription-view-card-main">

        {/* HEADER */}

        <div className="prescription-view-top">

          <div>

            <h1>
              Prescription
            </h1>

            <p>
              Dr.{" "}
              {
                appointment
                  .doctor.name
              }
            </p>

          </div>

          <button
            className="back-btn"
            onClick={() =>
              navigate(
                "/patient/history"
              )
            }
          >
            Back
          </button>

        </div>

        {/* INFO */}

        <div className="prescription-meta">

          <div className="meta-box">

            <span>
              Date
            </span>

            <h3>
              {new Date(
                appointment.date
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </h3>

          </div>

          <div className="meta-box">

            <span>
              Time
            </span>

            <h3>
              {appointment.time}
            </h3>

          </div>

          <div className="meta-box">

            <span>
              Status
            </span>

            <h3>
              {
                appointment.status
              }
            </h3>

          </div>

        </div>

        {/* DIAGNOSIS */}

        <div className="prescription-section">

          <h2>
            Diagnosis
          </h2>

          <p>
            {
              prescription
                .diagnosis
            }
          </p>

        </div>

        {/* MEDICINES */}

        <div className="prescription-section">

          <h2>
            Medicines
          </h2>

          <div className="medicine-grid">

            {prescription
              .medicines
              .map(
                (
                  med,
                  index
                ) => (

                  <div
                    key={index}
                    className="medicine-view-card"
                  >

                    <h3>
                      {med.name}
                    </h3>

                    <p>
                      <strong>
                        Dosage:
                      </strong>
                      {" "}
                      {
                        med.dosage
                      }
                    </p>

                    <p>
                      <strong>
                        Duration:
                      </strong>
                      {" "}
                      {
                        med.duration
                      }
                    </p>

                    <p>
                      <strong>
                        Instructions:
                      </strong>
                      {" "}
                      {
                        med.instructions
                      }
                    </p>

                  </div>
                )
              )}

          </div>

        </div>

        {/* NOTES */}

        <div className="prescription-section">

          <h2>
            Additional Notes
          </h2>

          <p>
            {
              prescription
                .notes
            }
          </p>

        </div>

      </div>

    </div>
  );
};

export default PatientPrescription;