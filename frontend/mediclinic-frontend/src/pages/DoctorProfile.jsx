import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorById } from "../features/doctor/doctorSlice";
const DoctorProfile = () => {
    const { doctor, loading } = useSelector((state) => state.doctor);
  const { id } = useParams();
const dispatch = useDispatch();
const navigate = useNavigate();
useEffect(() => {
  dispatch(getDoctorById(id));
}, [dispatch, id]);

if (loading) return <p>Loading...</p>;
if (!doctor) return <p>No doctor found</p>;

  return (
    <div className="profile">

  <div className="profile__header">
    <div className="profile__avatar">
      {doctor.name.charAt(0)}
    </div>

    <div className="profile__meta">
      <div className="profile__name">{doctor.name}</div>
      <div className="profile__specialization">
        {doctor.specialization}
      </div>
      <div className="profile__experience">
        {doctor.experience} years experience
      </div>
    </div>

    <button
  className="profile__cta"
  onClick={() => navigate(`/book/${doctor._id}`)}
>
  Book Appointment
</button>
  </div>

  <div className="profile__sections">

    <div className="profile__section">
      <div className="profile__section-title">About</div>
      <div className="profile__section-text">{doctor.bio}</div>
    </div>

    <div className="profile__section">
      <div className="profile__section-title">Qualification</div>
      <div className="profile__section-text">{doctor.qualification}</div>
    </div>

    <div className="profile__section">
      <div className="profile__section-title">Clinic</div>
      <div className="profile__section-text">
        {doctor.clinicDetails.clinicName}
      </div>
      <div className="profile__section-subtext">
        {doctor.clinicDetails.address}, {doctor.clinicDetails.city}
      </div>
    </div>

    <div className="profile__section">
      <div className="profile__section-title">Contact</div>
      <div className="profile__section-text">
        {doctor.email}
      </div>
    </div>

  </div>
</div>
  );
};

export default DoctorProfile;