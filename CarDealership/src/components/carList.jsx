import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { initialCars } from "./initialize";
import "../styles/car-list.css";

const CarList = () => {
  const [cars, setCars] = useState(initialCars);
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
    const diffTime = expiryDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 30;
  };

  return (
    <div ref={containerRef} className="car-container" id="vehicles">
      <h2 className="car-container-title">All vechiles</h2>

      <motion.div
        className="car-list"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            className={`car-card ${
              isRegistrationExpired(car.registration) ? "expired" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3>
              {car.brand} {car.model}
            </h3>
            <p>Godina: {car.year}</p>
            <p>Registracija: {car.registration}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CarList;
