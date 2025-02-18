import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/car-list.css";

const CarList = ({ cars, removeCar }) => {
  const containerRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);

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

  const sortedCars = [...cars].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
    return a.model.localeCompare(b.model);
  });

  const applyFilter = () => {
    let newFilteredCars = sortedCars.filter(
      (car) =>
        (filterBrand === "" ||
          car.brand.toLowerCase().includes(filterBrand.toLowerCase())) &&
        (filterModel === "" ||
          car.model.toLowerCase().includes(filterModel.toLowerCase()))
    );

    setFilteredCars(newFilteredCars);
    setShowFilters(false);
  };

  const isRegistrationExpired = (dateString) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    return (expiryDate - today) / (1000 * 60 * 60 * 24) <= 30;
  };

  return (
    <div ref={containerRef} className="car-container" id="vehicles">
      <div className="header">
        <h2 className="car-container-title">All vehicles</h2>
        <button className="filter-btn" onClick={() => setShowFilters(true)}>
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="filter-popup">
          <div className="filter-popup-content">
            <h3>Filter Vehicles</h3>
            <input
              type="text"
              placeholder="Brand"
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
            />
            <input
              type="text"
              placeholder="Model"
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
            />
            <button className="apply-filter-btn" onClick={applyFilter}>
              Apply Filter
            </button>
            <button
              className="close-filter-btn"
              onClick={() => setShowFilters(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <motion.div
        className="car-list"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {filteredCars.map((car, index) => (
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
