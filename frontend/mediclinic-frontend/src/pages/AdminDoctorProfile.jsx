import React, {
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getDoctorById,
  approveDoctor,
  rejectDoctor,
} from "../features/admin/adminSlice";

import toast from "react-hot-toast";

const AdminDoctorProfile = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const {
    selectedDoctor,
  } = useSelector(
    (state) =>
      state.admin
  );

  useEffect(() => {

    dispatch(
      getDoctorById(id)
    );

  }, [
    dispatch,
    id,
  ]);

  const handleApprove =
    () => {

      dispatch(
        approveDoctor(
          selectedDoctor._id
        )
      )
        .unwrap()
        .then(() => {

          toast.success(
            "Doctor approved successfully"
          );

          navigate(
            "/admin/pending-doctors"
          );

        })
        .catch((err) => {

          toast.error(err.message);

        });
    };

  const handleReject =
    () => {

      dispatch(
        rejectDoctor(
          selectedDoctor._id
        )
      )
        .unwrap()
        .then(() => {

          toast.success(
            "Doctor rejected"
          );

          navigate(
            "/admin/pending-doctors"
          );

        })
        .catch((err) => {

          toast.error(err);

        });
    };

  if (
    !selectedDoctor
  ) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <div className="doctor-approval-page">

      <h1>
        Doctor Profile
      </h1>

      <div className="approval-card">

        <span className="status-badge">
          {selectedDoctor.isApproved? "Approved" : "Pending Approval"}
        </span>

        <h2>
          Dr. {
            selectedDoctor.name
          }
        </h2>

        <div className="approval-grid">

          {/* PERSONAL INFO */}

          <div className="info-section">

            <h4>
              Personal Information
            </h4>

            <p>
              <strong>
                Name:
              </strong>
              {" "}
              {
                selectedDoctor.name
              }
            </p>

            <p>
              <strong>
                Email:
              </strong>
              {" "}
              {
                selectedDoctor.email
              }
            </p>

          </div>

          {/* PROFESSIONAL INFO */}

          <div className="info-section">

            <h4>
              Professional Information
            </h4>

            <p>
              <strong>
                Specialization:
              </strong>
              {" "}
              {
                selectedDoctor.specialization
              }
            </p>

            <p>
              <strong>
                Experience:
              </strong>
              {" "}
              {
                selectedDoctor.experience
              }{" "}
              Years
            </p>

            <p>
              <strong>
                Qualification:
              </strong>
              {" "}
              {
                selectedDoctor.qualification
              }
            </p>

          </div>

          {/* CLINIC INFO */}

          <div className="info-section">

            <h4>
              Clinic Details
            </h4>

            <p>
              <strong>
                Clinic:
              </strong>
              {" "}
              {
                selectedDoctor
                  ?.clinicDetails
                  ?.clinicName
              }
            </p>

            <p>
              <strong>
                Address:
              </strong>
              {" "}
              {
                selectedDoctor
                  ?.clinicDetails
                  ?.address
              }
            </p>

            <p>
              <strong>
                City:
              </strong>
              {" "}
              {
                selectedDoctor
                  ?.clinicDetails
                  ?.city
              }
            </p>

            <p>
              <strong>
                Contact:
              </strong>
              {" "}
              {
                selectedDoctor
                  ?.clinicDetails
                  ?.contactNumber
              }
            </p>

          </div>

          {/* AVAILABILITY */}

          <div className="info-section">

            <h4>
              Availability
            </h4>

            <p>
              <strong>
                Start:
              </strong>
              {" "}
              {
                selectedDoctor
                  ?.availability
                  ?.startTime ||
                "Not Set"
              }
            </p>

            <p>
              <strong>
                End:
              </strong>
              {" "}
              {
                selectedDoctor
                  ?.availability
                  ?.endTime ||
                "Not Set"
              }
            </p>

            <p>
              <strong>
                Patients/Hour:
              </strong>
              {" "}
              {
                selectedDoctor
                  ?.availability
                  ?.maxPatientsPerHour ||
                "Not Set"
              }
            </p>

          </div>

        </div>

        <div className="approval-actions">

          <button
            className="approve-btn"
            onClick={
              handleApprove
            }
          >
            Approve Doctor
          </button>

          <button
            className="reject-btn"
            onClick={
              handleReject
            }
          >
            Reject Doctor
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminDoctorProfile;