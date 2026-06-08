import React, {
  useState,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  addPrescription,
} from "../features/appointment/appointmentSlice";

const PrescriptionPage = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [diagnosis, setDiagnosis] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [medicines, setMedicines] =
    useState([
      {
        name: "",
        dosage: "",
        duration: "",
        instructions: "",
      },
    ]);

  /* HANDLE CHANGE */

  const handleMedicineChange =
    (
      index,
      field,
      value
    ) => {

      const updated =
        [...medicines];

      updated[index][field] =
        value;

      setMedicines(updated);
    };

  /* ADD FIELD */

  const addMedicineField =
    () => {

      setMedicines([
        ...medicines,

        {
          name: "",
          dosage: "",
          duration: "",
          instructions: "",
        },
      ]);
    };

  /* SAVE */

  const handleSave =
    () => {

      dispatch(
        addPrescription({
          id,

          data: {
            diagnosis,
            medicines,
            notes,
          },
        })
      )
        .unwrap()
        .then(() => {

          toast.success(
            "Prescription saved"
          );

          navigate(
            "/doctor/appointments"
          );
        })
        .catch((err) => {
          toast.error(err);
        });
    };

  return (
    <div className="prescription-page">

      <div className="prescription-card">

        {/* HEADER */}

        <div className="prescription-header">

          <h1>
            Write Prescription
          </h1>

          <p>
            Add diagnosis and medicines
          </p>

        </div>

        {/* DIAGNOSIS */}

        <div className="prescription-group">

          <label>
            Diagnosis
          </label>

          <textarea
            placeholder="Enter diagnosis..."
            value={diagnosis}
            onChange={(e) =>
              setDiagnosis(
                e.target.value
              )
            }
          />

        </div>

        {/* MEDICINES */}

        <div className="prescription-group">

          <div className="medicine-top">

            <label>
              Medicines
            </label>

            <button
              className="add-med-btn"
              onClick={
                addMedicineField
              }
            >
              + Add Medicine
            </button>

          </div>

          {medicines.map(
            (med, index) => (

              <div
                key={index}
                className="medicine-card"
              >

                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={med.name}
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "dosage",
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Duration"
                  value={med.duration}
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "duration",
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Instructions"
                  value={
                    med.instructions
                  }
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "instructions",
                      e.target.value
                    )
                  }
                />

              </div>
            )
          )}

        </div>

        {/* NOTES */}

        <div className="prescription-group">

          <label>
            Additional Notes
          </label>

          <textarea
            placeholder="Enter notes..."
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
          />

        </div>

        {/* SAVE */}

        <button
          className="save-prescription-btn"
          onClick={
            handleSave
          }
        >
          Save Prescription
        </button>

      </div>

    </div>
  );
};

export default PrescriptionPage;