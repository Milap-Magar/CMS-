import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Button from "./Button";

import Accordion from "./Accordian.component";

const Aside = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };

  return (
    <aside
      className={`${
        isMenuOpen ? "block" : "hidden"
      } md:block absolute md:static top-0 left-0 w-full md:w-[20vw] bg-slate-200 shadow-2xl shadow-slate-500 rounded-3xl p-6 md:p-0 md:h-[75vh] z-10`}
    >
      <span className="font-raleway font-semibold text-2xl sm:text-2xl md:text-md lg:text-lg absolute md:top-1 md:left-14 sm:top-6 sm:left-48 top-8 left-24">
        <u>Admin</u> <u>Dashboard</u>{" "}
      </span>
      <ul className="flex flex-col justify-between items-center gap-6 md:gap-5 py-12 ">
        <Link
          to="/admin/dashboard"
          onClick={() => setActiveLink("/admin/dashboard")}
        >
          <li
            className={`hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1 ${
              activeLink === "/admin/dashboard" ? "bg-slate-400" : ""
            }`}
          >
            <LuLayoutDashboard className="w-6 h-5" />
            Dashboard
          </li>
        </Link>
        <div>
          <Accordion />
        </div>
        <Link
          to="/admin/sub-admin"
          onClick={() => setActiveLink("/admin/sub-admin")}
        >
          <li
            className={`hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1 ${
              activeLink === "/admin/sub-admin" ? "bg-slate-400" : ""
            }`}
          >
            <GrUserAdmin className="w-6 h-5" />
            Add-Admin
          </li>
        </Link>
        <Link
          to="/admin/sub-admin"
          onClick={() => setActiveLink("/admin/sub-admin")}
        >
          <li
            className={`hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1 ${
              activeLink === "/admin/total" ? "bg-slate-400" : ""
            }`}
          >
            <PiStudentBold className="w-6 h-5" />
            Total Students
          </li>
        </Link>
        <Link
          to="/admin/settings"
          onClick={() => setActiveLink("/admin/settings")}
        >
          <li
            className={`hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1 ${
              activeLink === "/admin/settings" ? "bg-slate-400" : ""
            }`}
          >
            <IoSettingsOutline className="w-6 h-5" />
            Settings
          </li>
        </Link>
        <li
          className="hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1"
          onClick={handleLogout}
        >
          <IoLogOutOutline className="w-6 h-5" />
          Logout
        </li>
      </ul>
      {isMenuOpen && (
        <Button
          icons={<FaTimes />}
          className={`absolute top-4 right-4 text-2xl md:hidden`}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </aside>
  );
};

export default Aside;
