import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, city } = location.state || {}; // Receiving state and city
  const [medicalCenters, setMedicalCenters] = useState([]);

  useEffect(() => {
    if (state && city) {
      axios
        .get(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
        .then((response) => setMedicalCenters(response.data))
        .catch((error) => console.error('Error fetching medical centers:', error));
    }
  }, [state, city]);

  const handleBooking = (center) => {
    navigate('/booking', { state: { medicalCenter: center } });
  };

  return (
    <div className="search-results">
      <h2>Medical Centers in {city}, {state}</h2>
      {medicalCenters.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {medicalCenters.map((center) => (
            <SwiperSlide key={center['Provider ID']}>
              <div className="center-card">
                <h3>{center['Hospital Name']}</h3>
                <p>{center.Address}</p>
                <p>{center.City}, {center.State} - {center['ZIP Code']}</p>
                <p>Rating: {center['Hospital overall rating'] || 'N/A'}</p>
                <button onClick={() => handleBooking(center)}>Book Appointment</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No medical centers found for the selected location.</p>
      )}
    </div>
  );
};

export default SearchResults;


