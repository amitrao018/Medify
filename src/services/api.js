// src/api.js
import axios from "axios";

// Function to get all states
export const getStates = async () => {
  try {
    const response = await axios.get(
      "https://meddata-backend.onrender.com/states"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};

// Function to get cities of a state
export const getCities = async (state) => {
  try {
    const response = await axios.get(
      `https://meddata-backend.onrender.com/cities/${state}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for ${state}:`, error);
    throw error;
  }
};

// Function to get medical centers based on state and city
export const getMedicalCenters = async (state, city) => {
  try {
    const response = await axios.get(
      `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching medical centers for ${state}, ${city}:`,
      error
    );
    throw error;
  }
};

// Function to save booking details (to localStorage for simplicity)
export const saveBooking = (booking) => {
  const currentBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  currentBookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(currentBookings));
};
