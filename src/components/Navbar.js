import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Styling for Navbar
import icon from "../assets/icon.png"; // Adjust path if needed
import headline from "../assets/headline.png";

const Navbar = () => {
  return (
    <div>
      {/* Image above the Navbar */}
      <img src={headline} alt="Headline" className="headline-image" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <img src={icon} alt="MEDIFY Logo" className="navbar-icon" />
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <a href="#find-doctors">Find Doctors</a>
          </li>
          <li>
            <a href="#hospitals">Hospitals</a>
          </li>
          <li>
            <a href="#medicines">Medicines</a>
          </li>
          {/* Add any other unique navbar links here */}
        </ul>

        {/* Navbar button for My Bookings */}
        <div className="navbar-buttons">
          <Link to="/mybookings" className="navbar-button">
            My Bookings
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;



