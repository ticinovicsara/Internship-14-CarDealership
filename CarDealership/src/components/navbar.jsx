import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>CAR</span>DEALERSHIP TIČINOVIĆ
      </div>
      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#vehicles">Vehicles</a>
        </li>
        <li>
          <a href="#add">Add vehicle</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
