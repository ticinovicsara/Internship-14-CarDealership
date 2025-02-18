import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/car-list.css";

const CarList = ({ cars, removeCar }) => {
  const containerRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrolled) {
          containerRef.current.scrollIntoView({ behavior: "smooth" });
          setHasScrolled(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasScrolled]);

  const isRegistrationExpired = (dateString) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    return (expiryDate - today) / (1000 * 60 * 60 * 24) <= 30;
  };

  const sortedCars = cars.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    if (a.brand !== b.brand) {
      return a.brand.localeCompare(b.brand);
    }
    return a.model.localeCompare(b.model);
  });

  return (
    <div ref={containerRef} className="car-container" id="vehicles">
      <h2 className="car-container-title">All vechiles</h2>

      <motion.div
        className="car-list"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {sortedCars.map((car, index) => (
          <motion.div
            key={car.id}
            className={`car-card ${
              isRegistrationExpired(car.registration) ? "expired" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="card-title">
              {car.brand} {car.model}
            </h3>
            <p className="card-content">Type: {car.type}</p>
            <p className="card-content">Year: {car.year}</p>
            <p className="card-content">Registration: {car.registration}</p>
            <button className="delete-btn" onClick={() => removeCar(car.id)}>
              Remove
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CarList;
