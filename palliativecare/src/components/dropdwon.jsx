/** @format */

import React, { useState, useEffect } from "react";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
const [dropiconcolor, setDropiconcolor]= useState('#e8eaed')
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
function changedropiconcolor() {
    setDropiconcolor("#561E5A")
    
}
  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown menu
    if (
      !event.target.closest("#dropdownMenu") &&
      !event.target.closest("#dropdownButton")
    ) {
      setIsOpen(false);    setDropiconcolor("#e8eaed")
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    window.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div
        id="dropdownButton"
        onClick={()=>{toggleDropdown(), changedropiconcolor()} }
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill={dropiconcolor}
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      </div>
      <div
        id="dropdownMenu"
        className={`${
          isOpen ? "block" : "hidden"
        } origin-top-right absolute right-0 mt-2 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownButton"
        >
          <a
            href="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Login
          </a>
    
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Signup
          </a>
     
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
