import React, { useState } from "react";
import logo from "../../assets/pfp.jpg";
import { FaArrowLeft, FaHistory } from "react-icons/fa";
import { LuLayoutDashboard, LuInbox } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ userData }) => {
  // console.log("🚀 ~ Sidebar ~ userData:", userData);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("Token");
    // axios.defaults.headers.common["Authorization"] = null;

    // window.location.href = "/login";
    navigate("/");
  };

  const navigateDashboard = () => navigate("/user/dashboard");

  const handleComplaint = () => navigate("/user/complaint");

  const [open, setOpen] = useState(true);

  const Menus = [
    {
      title: "Dashboard",
      src: <LuLayoutDashboard className="h-8 w-7" />,
      onClick: navigateDashboard,
    },

    {
      title: "Complaints",
      src: <LuInbox className="h-8 w-7" />,
      onClick: handleComplaint,
    },
    { title: "Complain History", src: <FaHistory className="h-8 w-7" /> },
    { title: "Account Settings", src: <CgProfile className="h-8 w-7" /> },
    {
      title: "Settings",
      src: <IoSettingsOutline className="h-8 w-7" />,
      gap: true,
    },
    {
      title: "Logout",
      src: <CgLogOut className="h-8 w-7" />,
      gaps: true,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div className="flex">
        <div
          className={`${
            open ? "w-60" : "w-20 pt-8"
          } duration-500 h-screen bg-amber-600 relative p-3 `}
        >
          <FaArrowLeft
            className={`absolute cursor-pointer duration-1000 -right-3 top-16 w-10 h-10 p-2 border-2 border-amber-600 bg-white rounded-full ${
              open && "rotate-180 duration-1000"
            }`}
            onClick={() => setOpen(!open)}
          />
          <figure className="flex gap-x-4 items-center">
            <img
              src={logo}
              alt="Logo image"
              className={`cursor-pointer duration-500 h-44 w-48 border-2 rounded-full border-white bg-white ${
                !open && "rotate-[360deg] w-auto h-6 ms-3"
              }`}
            />
          </figure>

          <h2
            className={`text-white origin-left font-medium text-xl text-center duration-500 -ms-5 ${
              !open && "scale-0"
            }`}
          >
            {/* {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)} */}
            NAME
          </h2>
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <li
                key={index}
                className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-amber-800 rounded-md ${
                  menu.gap ? "mt-9" : "mt-2"
                }`}
                onClick={menu.onClick}
              >
                {menu.src}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
