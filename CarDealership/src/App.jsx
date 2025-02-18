import Hero from "./components/hero";
import Navbar from "./components/navbar";
import CarList from "./components/carList";
import CarForm from "./components/carForm";
import { initialCars } from "./components/initialize";
import { showToastError, showToastSuccess } from "./components/toast";
import { useState, useEffect } from "react";

function App() {
  const [cars, setCars] = useState(initialCars);

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
    setCars(storedCars);
  }, []);

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  const addCar = (newCar) => {
    if (cars.length >= 10) {
      showToastError("Max 10 vechiles allowed!");
      return;
    }
    setCars([...cars, newCar]);
    showToastSuccess("Car added successfully!");
  };

  const removeCar = (id) => {
    showToastSuccess("Car removed successfully!");
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div>
      <Navbar />
      <Hero />
      <CarList cars={cars} removeCar={removeCar} />
      <CarForm addCar={addCar} />
    </div>
  );
}

export default App;
