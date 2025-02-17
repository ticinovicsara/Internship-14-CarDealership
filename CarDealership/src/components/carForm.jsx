import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { carTypes } from "./initialize";
import "../styles/carForm.css";

const CarForm = ({ addCar }) => {
  const [car, setCar] = useState({
    brand: "",
    model: "",
    type: "SUV",
    year: "",
    registration: "",
  });

  const [error, setError] = useState("");
  const formRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (formRef.current && !hasScrolled) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
      setHasScrolled(true);
    }
  }, [hasScrolled]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!car.brand || !car.model || !car.year || !car.registration) {
      setError("All fields are required!");
      return;
    }
    setError("");
    addCar({ id: uuidv4(), ...car });
    setCar({ brand: "", model: "", type: "SUV", year: "", registration: "" });
  };

  return (
    <div ref={formRef} className="car-form-container" id="add">
      <h2 className="car-form-title">Add a vehicle</h2>
      <form className="car-form" onSubmit={handleSubmit}>
        <input
          className="input-box"
          type="text"
          name="brand"
          placeholder="Brand"
          value={car.brand}
          onChange={handleChange}
        />
        <input
          className="input-box"
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
          className="input-box"
        >
          {carTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          className="input-box"
          type="number"
          name="year"
          placeholder="Year of production"
          value={car.year}
          onChange={handleChange}
        />
        <input
          className="input-box"
          type="date"
          name="registration"
          placeholder="Registration expiration date"
          value={car.registration}
          onChange={handleChange}
        />
        <button type="submit" className="submit-btn">
          Add vehicle
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CarForm;
