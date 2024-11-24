import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { medicalCenter } = location.state || {}; // Selected medical center details

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }
    return dates;
  };

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
  ];

  // Confirm Booking Handler
  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      const booking = {
        medicalCenter, // Pass this from state or props
        date: selectedDate, // Selected date from the calendar
        time: selectedTime, // Selected time slot
      };

      const existingBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];
      localStorage.setItem(
        "bookings",
        JSON.stringify([...existingBookings, booking])
      );

      alert("Booking confirmed!");
      setConfirmation(
        `Appointment booked for ${medicalCenter["Hospital Name"]} on ${selectedDate} at ${selectedTime}.`
      );
      setTimeout(() => {
        navigate("/mybookings"); // Redirect to My Bookings page after 2 seconds
      }, 2000);
    } else {
      alert("Please select both a date and a time slot.");
    }
  };

  return (
    <div className="booking-page">
      <h1>Book an Appointment</h1>
      <h2>{medicalCenter?.["Hospital Name"] || "Medical Center"}</h2>
      <p>
        {medicalCenter?.Address}, {medicalCenter?.City}, {medicalCenter?.State}{" "}
        - {medicalCenter?.["ZIP Code"]}
      </p>

      <div className="booking-form">
        <label>
          Select Date:
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Choose a date</option>
            {generateDates().map((date) => (
              <option key={date} value={date}>
                {new Date(date).toDateString()}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Time Slot:
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!selectedDate}
          >
            <option value="">Choose a time slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

        <button onClick={handleConfirmBooking}>Confirm Booking</button>
      </div>

      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
  );
};

export default BookingPage;




