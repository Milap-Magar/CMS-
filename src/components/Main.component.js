import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = ({ userData, error }) => {
  useEffect(() => {
    // Check if userData is available and if the toast has not been shown yet
    if (userData && userData.name) {
      const toastShownKey = `toastShown_${userData.name}`;

      // Check if the toast was already shown in this session
      const toastShown = sessionStorage.getItem(toastShownKey);

      if (!toastShown) {
        // Show the toast
        toast.dismiss();
        toast.success(`Hi ${userData.name}! Welcome to the system.`, {
          className: "custom-toast",
        });

        // Set the flag in session storage
        sessionStorage.setItem(toastShownKey, "true");
      }
    }
  }, [userData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ToastContainer limit={1} toastClassName="custom-toast-container" />
      <div className="container mx-auto">
        <div className="w-full flex flex-col justify-center items-center py-8 bg-amber-500 text-white text-xl shadow-xl shadow-amber-400">
          <h6>Patan Multiple Campus</h6>
          <h2 className="text-xl sm:2xl md:3xl lg:5xl text-slate-900">
            Complain Management System
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 pt-16">
          <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Complaints
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              120+
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Users
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">90+</div>
          </div>
          <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Resolved
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">20</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
