import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/background.jpg";
import Logo from "../assets/logo.jpeg";

const Main = () => {
  return (
    <>
      <div className="w-full h-screen relative">
        <figure className="w-full h-full absolute top-0 left-0">
          <img
            src={Image}
            alt="main image"
            className="w-full h-full object-cover"
          />
        </figure>
        <nav className="flex items-center justify-between p-4 absolute top-0 left-0 w-full h-[20vh] z-10 bg-opacity-50 bg-slate-300 text-slate-900">
          <figure>
            <img
              src={Logo}
              alt="logo"
              className="w-24 h-24 object-contain mix-blend-multiply"
            />
          </figure>

          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <h3 className="text-5xl font-bold text-slate-900 drop-shadow-lg animate-pulse">
              Patan Multiple Campus
            </h3>
            <div className="text-lg text-slate-600 text-center">
              <p>Patandhoka, Lalitpur</p>
              <p>Phone No: 01-1234567</p>
            </div>
          </div>

          <ul className="flex space-x-4">
            <li>
              <Link
                to={"/user/login"}
                className="relative inline-block text-slate-900 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bg-slate-900 after:left-0 after:bottom-0 after:origin-bottom-right after:transition-transform after:duration-500 after:ease-in-out hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                User Login
              </Link>
            </li>
            <li>
              <Link
                to={"/user/register"}
                className="relative inline-block text-slate-900 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bg-slate-900 after:left-0 after:bottom-0 after:origin-bottom-right after:transition-transform after:duration-500 after:ease-in-out hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                User Register
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/login"}
                className="relative inline-block text-slate-900 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bg-slate-900 after:left-0 after:bottom-0 after:origin-bottom-right after:transition-transform after:duration-500 after:ease-in-out hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Main;
