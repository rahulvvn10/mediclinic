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
  getApprovedDoctors,
  activateDoctor,
  deactivateDoctor,
} from "../features/admin/adminSlice";

import toast from "react-hot-toast";

const ApprovedDoctors =
  () => {

    const dispatch =
      useDispatch();

    const navigate =
      useNavigate();

    const {
      approvedDoctors,
    } = useSelector(
      (state) =>
        state.admin
    );

    useEffect(() => {

      dispatch(
        getApprovedDoctors()
      );

    }, [dispatch]);

    const handleDeactivate =
      (id) => {

        dispatch(
          deactivateDoctor(
            id
          )
        )
          .unwrap()
          .then(() => {

            toast.success(
              "Doctor deactivated"
            );

            dispatch(
              getApprovedDoctors()
            );

          })
          .catch((err) => {

            toast.error(
              err
            );

          });
      };

    const handleActivate =
      (id) => {

        dispatch(
          activateDoctor(
            id
          )
        )
          .unwrap()
          .then(() => {

            toast.success(
              "Doctor activated"
            );

            dispatch(
              getApprovedDoctors()
            );

          })
          .catch((err) => {

            toast.error(
              err
            );

          });
      };

    return (
      <div className="approved-page">

        <div className="approved-header">

          <h1>
            Approved Doctors
          </h1>

          <p>
            Manage active
            doctors on the
            platform
          </p>

        </div>

        <div className="doctors-grid">

          {approvedDoctors
            ?.length ===
          0 ? (

            <h3>
              No approved
              doctors
            </h3>

          ) : (

            approvedDoctors?.map(
              (
                doctor
              ) => (

                <div
                  key={
                    doctor._id
                  }
                  className="doctor-card"
                >

                  <h3>
                    Dr.{" "}
                    {
                      doctor.name
                    }
                  </h3>

                  <p>
                    {
                      doctor.specialization
                    }
                  </p>

                  <p>
                    {
                      doctor
                        ?.clinicDetails
                        ?.clinicName
                    }
                  </p>

                  <p>
                    {
                      doctor.experience
                    }{" "}
                    Years
                  </p>

                  <p
                    className={
                      doctor.isActive
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {doctor.isActive
                      ? "🟢 Active"
                      : "🔴 Inactive"}
                  </p>

                  <div className="doctor-actions">

                  

                    {doctor.isActive ? (

                      <button
                        className="deactivate-btn"
                        onClick={() =>
                          handleDeactivate(
                            doctor._id
                          )
                        }
                      >
                        Deactivate
                      </button>

                    ) : (

                      <button
                        className="activate-btn"
                        onClick={() =>
                          handleActivate(
                            doctor._id
                          )
                        }
                      >
                        Activate
                      </button>

                    )}

                  </div>

                </div>
              )
            )

          )}

        </div>

      </div>
    );
  };

export default
  ApprovedDoctors;