import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../features/doctor/doctorSlice";

import toast from "react-hot-toast";

const ProfileDoctor = () => {
  const dispatch = useDispatch();

  const {
    profile,
    loading,
  } = useSelector(
    (state) => state.doctor
  );

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    bio: "",

    clinicName: "",
    address: "",
    city: "",
    contactNumber: "",
  });

  /* FETCH PROFILE */
  useEffect(() => {
    dispatch(getDoctorProfile());
  }, [dispatch]);

  /* PREFILL FORM */
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",

        specialization:
          profile.specialization || "",

        qualification:
          profile.qualification || "",

        experience:
          profile.experience || "",

        bio:
          profile.bio || "",

        clinicName:
          profile.clinicDetails
            ?.clinicName || "",

        address:
          profile.clinicDetails
            ?.address || "",

        city:
          profile.clinicDetails
            ?.city || "",

        contactNumber:
          profile.clinicDetails
            ?.contactNumber || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateDoctorProfile(
        form
      )
    )
      .unwrap()
      .then(() => {
        toast.success(
          "Profile updated"
        );
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="doctor-profile-page">

      <div className="profile-layout">

        {/* LEFT */}
        <div className="profile-summary">

          <h2>
            Dr. {form.name}
          </h2>

          <p>
            {
              form.specialization
            }
          </p>

          <span>
            {
              form.experience
            }{" "}
            Years Experience
          </span>

        </div>

        {/* RIGHT */}
        <div className="profile-form-card">

          <h2>
            Edit Profile
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <div className="form-grid">

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={
                  form.specialization
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={
                  form.qualification
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="number"
                name="experience"
                placeholder="Experience"
                value={
                  form.experience
                }
                onChange={
                  handleChange
                }
              />

            </div>

            <textarea
              name="bio"
              placeholder="Bio"
              value={form.bio}
              onChange={
                handleChange
              }
            />

            <h3>
              Clinic Details
            </h3>

            <div className="form-grid">

              <input
                type="text"
                name="clinicName"
                placeholder="Clinic Name"
                value={
                  form.clinicName
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={
                  form.address
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={
                  form.contactNumber
                }
                onChange={
                  handleChange
                }
              />

            </div>

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

export default ProfileDoctor;