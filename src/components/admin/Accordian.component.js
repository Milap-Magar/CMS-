import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div
        onClick={toggleAccordion}
        className="cursor-pointer flex items-center p-5 hover:bg-slate-300 transition-colors duration-200"
      >
        <FaRegFileAlt className="w-6 h-5" />
        <span className="ml-2 text-lg">Complaints</span>
        <svg
          className={`ml-auto transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="20" height="20" viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="bg-gray-100 p-3 rounded-xl absolute">
          <Link
            to="#"
            className="block text-gray-700 py-2 px-4 hover:bg-gray-200 rounded"
          >
            View Complaints
          </Link>
          <Link
            to="#"
            className="block text-gray-700 py-2 px-4 hover:bg-gray-200 rounded"
          >
            File a Complaint
          </Link>
          <Link
            to="#"
            className="block text-gray-700 py-2 px-4 hover:bg-gray-200 rounded"
          >
            Complaint History
          </Link>
        </div>
      )}
    </div>
  );
};

export default Accordion;
