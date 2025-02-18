import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastNotification, showToastError, showToastSuccess } from "./toast";
import { carTypes } from "./initialize";
import "react-toastify/dist/ReactToastify.css";
import "../styles/carForm.css";

const CarForm = ({ addCar }) => {
  const [car, setCar] = useState({
    brand: "",
    model: "",
    type: "SUV",
    year: "",
    registration: "",
  });

  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!car.brand || !car.model || !car.year || !car.registration) {
      showToastError("All fields are required!");
      return;
    }
    addCar({ id: uuidv4(), ...car });
    setCar({ brand: "", model: "", type: "SUV", year: "", registration: "" });
  };

  return (
    <div ref={formRef} className="car-form-container" id="add">
      <ToastNotification />
      <h2 className="car-form-title">Add a vehicle</h2>
      <form className="car-form" onSubmit={handleSubmit}>
        <input
          className={`input-box ${isVisible ? "visible" : ""}`}
          type="text"
          name="brand"
          placeholder="Brand"
          value={car.brand}
          onChange={handleChange}
        />
        <input
          className={`input-box ${isVisible ? "visible" : ""}`}
          type="text"
          name="model"
          placeholder="Model"
          value={car.model}
          onChange={handleChange}
        />
        <select
          name="type"
          value={car.type}
          onChange={handleChange}
          className={`input-box ${isVisible ? "visible" : ""}`}
        >
          {carTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          className={`input-box ${isVisible ? "visible" : ""}`}
          type="number"
          name="year"
          placeholder="Year of production"
          value={car.year}
          onChange={handleChange}
        />
        <div className="tooltip-container">
          <input
            className="input-box date-input"
            type="date"
            name="registration"
            value={car.registration}
            onChange={handleChange}
          />
          <div className="tooltip-text">
            Here goes registration expiration date
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Add vehicle
        </button>
      </form>
    </div>
  );
};

export default CarForm;
