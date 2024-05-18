import React from "react";
import logo from "../public/image.png";
import "./style.css";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen p-3 bg-amber-400 shadow-red-700 shadow-2xl w-60">
      <figure>
        <img src={logo} alt="logo" className={`logo w-full h-[10vh]`} />
      </figure>

      <div className="space-y-6">
        <div className="py-10 flex justify-center items-center">
          <h2 className="text-xl font-bold">
            <a href="/dashboard">Admin Dashboard</a>
          </h2>
        </div>
        <div className="flex-1">
          <ul className="gap-5 space-y-5 text-sm flex flex-col justify-start items-center">
            <li>
              <a href="/analytics">Analytics</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
