import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "../assets/background.jpg";
import Logo from "../assets/logo.jpeg";

const Main = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative overflow-hidden h-screen">
      <figure className={`absolute inset-0 ${menuOpen ? "blur-sm" : ""}`}>
        <img
          src={Image}
          alt="main image"
          className="w-full h-full object-cover"
        />
      </figure>
      <nav className="flex items-center justify-between py-5 px-4 absolute top-0 left-0 right-0 bg-opacity-50 bg-slate-300 text-slate-900 z-20">
        <figure>
          <img
            src={Logo}
            alt="logo"
            className="w-16 h-16 md:w-24 md:h-24 object-contain mix-blend-multiply"
          />
        </figure>
        <div className="flex items-center justify-center flex-grow ps-4">
          <div>
            <h3 className="text-md sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-center pb-1">
              Student Complaint Management System
            </h3>
            <div className="text-sm text-slate-600 text-center">
              <p>Phone No: 01-1234567</p>
            </div>
          </div>
        </div>

        {isSmallScreen && (
          <button
            className="text-slate-900 focus:outline-none z-30" 
            onClick={toggleMenu}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        )}

        {/* Menu list */}
        <ul
          className={`fixed inset-0 flex flex-col items-center justify-center bg-slate-300 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } sm:static sm:translate-x-0 sm:flex-row sm:flex sm:gap-4 sm:bg-transparent z-20`}
        >
          <li className="m-2 sm:m-0">
            <Link
              to={"/user/login"}
              className="bg-green-400 hover:text-white px-4 py-2 rounded-md transition duration-1000"
              onClick={() => setMenuOpen(false)}
            >
              Student Login
            </Link>
          </li>
          <li className="m-2 sm:m-0">
            <Link
              to={"/user/register"}
              className="hover:bg-sky-400 hover:text-white px-6 py-2 rounded-2xl transition duration-700"
              onClick={() => setMenuOpen(false)}
            >
              Student Register
            </Link>
          </li>
          <li className="m-2 sm:m-0">
            <Link
              to={"/admin/login"}
              className="hover:bg-sky-400 hover:text-white px-6 py-2 rounded-2xl transition duration-700"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
          </li>
        </ul>
      </nav>

      <div
        className={`absolute inset-x-0 top-36 flex items-center justify-center h-auto px-4 sm:px-8 py-4 transition-opacity duration-300 ease-in-out z-10 ${
          menuOpen ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <div className="container bg-white p-5 rounded-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold text-slate-900 mb-4">
              Complain Management System
            </h1>
            <span className="text-xl sm:text-xl md:text-xl lg:text-2xl font-normal text-slate-900 mb-4">
              A Complaint Management System improves communication,
              accountability, trust, and efficiency, fostering a positive,
              transparent, and responsive school environment.
            </span>
          </div>
          <h2 className="text-2xl sm:text-lg md:text-xl lg:text-xl font-light text-slate-900 mb-4 mt-5">
            How can I help you?
          </h2>
          <input
            type="text"
            placeholder="Enter your complain-code to check...."
            className="px-4 py-2 w-full sm:w-[30vw] text-slate-700 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
