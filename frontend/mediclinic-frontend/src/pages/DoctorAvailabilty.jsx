import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAvailability } from "../features/doctor/doctorSlice";
import toast from "react-hot-toast";
import { getAvailability } from "../features/appointment/appointmentSlice";

const DoctorAvailability = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.doctor
  );

  const { availability } = useSelector(
    (state)=>state.appointment);
  const [form, setForm] = useState({
    startTime: "",
    endTime: "",
    maxPatientsPerHour: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setAvailability(form))
      .unwrap()
      .then(() => {
        toast.success("Availability updated");
          
      })
      .catch((err) => {
        toast.error(err);
      });
  };
useEffect(() => {
  dispatch(getAvailability());
}, [dispatch]);
useEffect(() => {
  if (availability) {
    setForm({
      startTime: availability.startTime || "",
      endTime: availability.endTime || "",
      maxPatientsPerHour:
        availability.maxPatientsPerHour || "",
    });
  }
}, [availability]);
  return (
    <div className="availability-page">

      <div className="availability-card">

        <h2>Set Availability</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Start Time</label>

            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Time</label>

            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Max Patients Per Hour</label>

            <input
              type="number"
              name="maxPatientsPerHour"
              value={form.maxPatientsPerHour}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : "Save Availability"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default DoctorAvailability;