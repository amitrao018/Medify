import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import "./LandingPage.css";
import DoctorLogo from '../assets/Doctor.png';
import DrugstoreLogo from '../assets/Drugstore.png';
import HospitalLogo from '../assets/Hospital.png';
import CapsuleLogo from '../assets/Capsule.png';
import AmbulanceLogo from '../assets/Ambulance.png';

const LandingPage = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  // Fetch states from the API on page load
  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((response) => setStates(response.data))
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      axios
        .get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then((response) => setCities(response.data))
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [selectedState]);

  const handleSearch = () => {
    if (selectedState && selectedCity) {
      navigate("/results", {
        state: { state: selectedState, city: selectedCity },
      });
    } else {
      alert("Please select both state and city.");
    }
  };

  return (
    <div className="landing-page">
      <div className="container">
        {/* Search Row */}
        <div className="search-row">
          {/* State dropdown */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="dropdown"
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

          {/* City dropdown */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="dropdown"
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* "You may be looking for" section */}
        <div className="other-content">
          <h3>You may be looking for</h3>
          <div className="card-container">
            {/* Wrap each card with Link */}
            <Link to="/doctors" className="card">
              <img src={DoctorLogo} alt="Doctor Logo" />
              <p>Doctors</p>
            </Link>
            <Link to="/labs" className="card">
              <img src={DrugstoreLogo} alt="Lab Logo" />
              <p>Labs</p>
            </Link>
            <Link to="/hospitals" className="card">
              <img src={HospitalLogo} alt="Hospital Logo" />
              <p>Hospitals</p>
            </Link>
            <Link to="/medicine-stores" className="card">
              <img src={CapsuleLogo} alt="Medicine Store Logo" />
              <p>Medicine Stores</p>
            </Link>
            <Link to="/ambulances" className="card">
              <img src={AmbulanceLogo} alt="Ambulance Logo" />
              <p>Ambulances</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;








