import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Using axios for API calls

const Main = ({ userData, error }) => {
  console.log("🚀 ~ Main ~ userData:", userData);

  const [resolvedComplaintsCount, setResolvedComplaintsCount] = useState(0);
  const [totalComplaintsCount, setTotalComplaintsCount] = useState(0);

  useEffect(() => {
    if (userData && userData.name) {
      const toastShownKey = `toastShown_${userData.name}`;
      const toastShown = sessionStorage.getItem(toastShownKey);

      if (!toastShown) {
        toast.dismiss();
        toast.success(`Hi ${userData.name}! Welcome to the system.`, {
          className: "custom-toast",
        });
        sessionStorage.setItem(toastShownKey, "true");
      }
    }
  }, [userData]);

  useEffect(() => {
    const fetchComplaintsCount = async () => {
      try {
        if (userData && userData.Sid) {
          const totalResponse = await axios.get(
            `http://localhost:8080/handle/complaints/count/${userData.Sid}`
          );
          if (totalResponse.data.success) {
            setTotalComplaintsCount(totalResponse.data.count);
          } else {
            toast.error("Failed to fetch total complaints count.");
          }
          const resolvedResponse = await axios.get(
            `http://localhost:8080/handle/complaints/count/${userData.Sid}`
          );
          if (resolvedResponse.data.success) {
            setResolvedComplaintsCount(resolvedResponse.data.count);
          } else {
            toast.error("Failed to fetch resolved complaints count.");
          }
        }
      } catch (error) {
        console.error("Error fetching complaints count:", error);
        toast.error("Error fetching complaints count.");
      }
    };

    fetchComplaintsCount();
  }, [userData]);

  // Render error if there's any
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ToastContainer limit={1} toastClassName="custom-toast-container" />
      <div className="container mx-auto">
        <div className="w-full flex flex-col justify-center items-center py-8 bg-amber-500 text-white text-xl shadow-xl shadow-amber-400">
          <h2 className="text-2xl sm:3xl md:4xl lg:5xl text-slate-900">
            Complain Management System
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 pt-16">
          {/* Complaint Status Card */}
          <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
            <div className="text-sm font-medium text-gray-500 truncate">
              Complaint Status
            </div>
            <div className="mt-1 text-3xl font-200 text-gray-900">Pending</div>
          </div>

          {/* Total Complaints Card */}
          <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Complaints
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {totalComplaintsCount}
            </div>
          </div>

          {/* Total Resolved Complaints Card */}
          <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Resolved
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {resolvedComplaintsCount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
