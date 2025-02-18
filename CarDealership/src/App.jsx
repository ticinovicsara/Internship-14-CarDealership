import Hero from "./components/hero";
import Navbar from "./components/navbar";
import CarList from "./components/carList";
import CarForm from "./components/carForm";
import { initialCars } from "./components/initialize";
import { showToastError, showToastSuccess } from "./components/toast";
import { useState, useEffect } from "react";

function App() {
  const getStoredCars = () => {
    const storedCars = localStorage.getItem("cars");
    return storedCars ? JSON.parse(storedCars) : initialCars;
  };

  const [cars, setCars] = useState(getStoredCars);

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  const addCar = (newCar) => {
    if (cars.length >= 10) {
      showToastError("Max 10 vehicles allowed!");
      return;
    }
    setCars([...cars, newCar]);
    showToastSuccess("Vehicle added successfully!");
  };

  const removeCar = (id) => {
    showToastSuccess("Vehicle removed successfully!");
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
