import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSlots, bookAppointment, getMyAppointments } from "../features/appointment/appointmentSlice";
import toast from "react-hot-toast";
const BookingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { slots, loadingSlots, bookingLoading } = useSelector(
    (state) => state.appointment
  );

  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  /* HANDLE DATE CHANGE */
  const handleDateChange = (e) => {
    const d = e.target.value;
    setDate(d);
    setSelectedTime(null);

    dispatch(getSlots({ doctorId: id, date: d }));
  };

  /* HANDLE BOOK */
  const handleBook = () => {
    if (!selectedTime) return;

    dispatch(
      bookAppointment({
        doctorId: id,
        date,
        time: selectedTime,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Appointment booked successfully");
        setSelectedTime(null);
        dispatch(getSlots({ doctorId: id, date }));
        dispatch(getMyAppointments());
        navigate("/patient");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Booking failed");
      });
  };

  return (
    <div className="booking-page">

      <h2>Book Appointment</h2>

      {/* DATE */}
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
      />

      {/* LOADING */}
      {loadingSlots && <p>Loading slots...</p>}

      {/* SLOTS */}
      <div className="slots-grid">
        {slots.map((slot) => (
          <button
            key={slot.time}
            disabled={slot.isFull}
            className={`slot-btn 
              ${slot.isFull ? "full" : ""} 
              ${selectedTime === slot.time ? "selected" : ""}`}
            onClick={() => setSelectedTime(slot.time)}
          >
            {slot.time}
            <br />
            {slot.isFull ? "Full" : `${slot.available} left`}
          </button>
        ))}
      </div>

      {/* BOOK BUTTON */}
      {selectedTime && (
        <button
          className="confirm-btn"
          onClick={handleBook}
          disabled={bookingLoading}
        >
          {bookingLoading ? "Booking..." : `Confirm ${selectedTime}`}
        </button>
      )}

    </div>
  );
};

export default BookingPage;