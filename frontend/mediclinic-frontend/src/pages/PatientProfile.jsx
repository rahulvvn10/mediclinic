import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  getPatientProfile,
  updatePatientProfile,
} from "../features/patient/patientSlice";

const PatientProfile = () => {
  const dispatch =
    useDispatch();

  const {
    profile,
    loading,
  } = useSelector(
    (state) => state.patient
  );

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      address: "",
    });

  /* FETCH PROFILE */
  useEffect(() => {
    dispatch(
      getPatientProfile()
    );
  }, [dispatch]);

  /* PREFILL FORM */
  useEffect(() => {
    if (profile) {
      setForm({
        name:
          profile.name || "",

        email:
          profile.email || "",

        phone:
          profile.phone || "",

        age:
          profile.age || "",

        gender:
          profile.gender || "",

        address:
          profile.address || "",
      });
    }
  }, [profile]);

  /* HANDLE CHANGE */
  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  /* SUBMIT */
  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    dispatch(
      updatePatientProfile(
        form
      )
    )
      .unwrap()
      .then(() => {
        toast.success(
          "Profile updated"
        );

        dispatch(
          getPatientProfile()
        );
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="patient-profile-page">

      <div className="patient-profile-layout">

        {/* LEFT CARD */}
        <div className="patient-summary-card">

          <div className="patient-avatar">
            {form.name?.charAt(
              0
            )}
          </div>

          <h2>
            {form.name}
          </h2>

          <p>
            {form.email}
          </p>

        </div>

        {/* RIGHT FORM */}
        <div className="patient-form-card">

          <h2>
            Edit Profile
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <div className="patient-form-grid">

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={
                  form.phone
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={
                  form.age
                }
                onChange={
                  handleChange
                }
              />

              <select
                name="gender"
                value={
                  form.gender
                }
                onChange={
                  handleChange
                }
              >
                <option value="">
                  Select Gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>

            <textarea
              name="address"
              placeholder="Address"
              value={
                form.address
              }
              onChange={
                handleChange
              }
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Profile"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default PatientProfile;