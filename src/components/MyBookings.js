import React, { useState, useEffect } from "react";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from local storage on component mount
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  // Delete a booking
  const handleDelete = (indexToDelete) => {
    const updatedBookings = bookings.filter(
      (_, index) => index !== indexToDelete
    );
    setBookings(updatedBookings); // Update state
    localStorage.setItem("bookings", JSON.stringify(updatedBookings)); // Update local storage
    alert("Booking deleted successfully.");
  };

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <h3>{booking.medicalCenter["Hospital Name"]}</h3>
              <p>{booking.medicalCenter.Address}</p>
              <p>
                {booking.medicalCenter.City}, {booking.medicalCenter.State}
              </p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings yet. Start by booking an appointment!</p>
      )}
    </div>
  );
};

export default MyBookings;

