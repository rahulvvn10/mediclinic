import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../features/doctor/doctorSlice";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading } = useSelector((state) => state.doctor);
  const navigate = useNavigate();

  // 🔹 Immediate UI state
  const [filters, setFilters] = useState({
    search: "",
    specialization: "",
    city: "",
    sort: "",
  });

  // 🔹 Debounced state
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // 🔹 Debounce effect
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(delay);
  }, [filters]);

  // 🔹 API call only when debounced filters change
  useEffect(() => {
    dispatch(getDoctors(debouncedFilters));
  }, [debouncedFilters, dispatch]);

  if (loading) return <p className="text-center">Loading doctors...</p>;

  return (
    <div className="container">
      <h2 className="section-title">Find Doctors</h2>

      {/* 🔥 FILTER UI */}
      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search doctors..."
          value={filters.search}
          onChange={handleChange}
        />

        <select
          name="specialization"
          value={filters.specialization}
          onChange={handleChange}
        >
          <option value="">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Neurologist">Neurologist</option>
        </select>

        <select
          name="city"
          value={filters.city}
          onChange={handleChange}
        >
          <option value="">All Cities</option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
        >
          <option value="">Sort</option>
          <option value="experience">Experience (High → Low)</option>
        </select>

        <button
          className="reset-btn"
          onClick={() =>
            setFilters({
              search: "",
              specialization: "",
              city: "",
              sort: "",
            })
          }
        >
          Reset
        </button>
      </div>

      {/* 🔹 DOCTOR LIST */}
      <div className="doctor-list">
        {doctors.length === 0 ? (
          <p>No doctors found</p>
        ) : (
          doctors.map((doc) => (
            <div
              className="doctor-card"
              key={doc._id}
              onClick={() => navigate(`/doctors/${doc._id}`)}
            >
              <div className="doctor-avatar">
                {doc.name.charAt(0)}
              </div>

              <h3>{doc.name}</h3>
              <p className="specialization">{doc.specialization}</p>

              <p className="location">
                {doc.clinicDetails?.address}
              </p>

              <span>{doc.experience} years experience</span>

              <button className="book-btn">
                Book Appointment
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Doctors;