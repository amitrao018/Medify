import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SearchResults from "./components/SearchResults";
import BookingPage from "./components/BookingPage";
import MyBookings from "./components/MyBookings";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </>
  );
}

export default App;



