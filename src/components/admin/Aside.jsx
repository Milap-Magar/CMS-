import React from "react";

import { FaBars, FaTimes, FaRegFileAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const Aside = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();

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
      <span className="font-raleway font-semibold text-2xl sm:text-2xl md:text-md lg:text-lg absolute md:top-6 md:left-8 sm:top-6 sm:left-48 top-8 left-24">
        Admin Dashboard
      </span>
      <ul className="flex flex-col justify-between items-center gap-10 md:gap-4 py-20">
        <Link>
          <li className="hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1">
            <LuLayoutDashboard className="w-6 h-5" />
            Dashboard
          </li>
        </Link>

        <Link>
          <li className="hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1">
            <FaRegFileAlt className="w-6 h-5" />
            Complaints
          </li>
        </Link>

        <Link>
          <li className="hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1">
            <GrUserAdmin className="w-6 h-5" />
            Sub-Admin
          </li>
        </Link>

        <Link>
          <li className="hover:bg-slate-300 p-2 rounded-lg cursor-pointer flex gap-1">
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
