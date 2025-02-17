import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!car.brand || !car.model || !car.year || !car.registration) {
      setError("Sva polja su obavezna!");
      return;
    }
    setError("");
    addCar({ id: uuidv4(), ...car });
    setCar({ brand: "", model: "", type: "SUV", year: "", registration: "" });
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <h2 class="car-form-title">Add a vechile</h2>
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={car.brand}
        onChange={handleChange}
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={car.model}
        onChange={handleChange}
      />
      <select name="type" value={car.type} onChange={handleChange}>
        <option value="SUV">SUV</option>
        <option value="Sedan">Sedan</option>
        <option value="Hatchback">Hatchback</option>
      </select>
      <input
        type="number"
        name="year"
        placeholder="Year of production"
        value={car.year}
        onChange={handleChange}
      />
      <input
        type="date"
        name="registration"
        placeholder="Datum isticanja registracije"
        value={car.registration}
        onChange={handleChange}
      />
      <button type="submit">Add vechile</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CarForm;
