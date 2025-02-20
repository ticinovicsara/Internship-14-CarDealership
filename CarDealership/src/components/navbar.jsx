import React, { useState, useRef, useEffect } from "react";
import "../styles/navbar/navbar.css";
import "../styles/navbar/dropdown.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="navbar">
      <div className="logo">
        <span>CAR</span>DEALERSHIP
      </div>
      <ul className={`nav-links ${isDropdownOpen ? "open" : ""}`}>
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

      <div className="hamburger-menu" onClick={toggleDropdown}>
        <img src="/hamburger-menu.png" alt="Menu" />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={`mobile-dropdown ${isDropdownOpen ? "open" : ""}`}
        >
          <ul className="dropdown-content">
            <li>
              <a href="#home" onClick={closeDropdown}>
                Home
              </a>
            </li>
            <li>
              <a href="#vehicles" onClick={closeDropdown}>
                Vehicles
              </a>
            </li>
            <li>
              <a href="#add" onClick={closeDropdown}>
                Add vehicle
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
