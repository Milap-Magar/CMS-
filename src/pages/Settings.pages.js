import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../components/Button";
import Headers from "../components/admin/Headers.component";
import { FaBars } from "react-icons/fa";
import Aside from "../components/admin/Aside";
import { useNavigate } from "react-router-dom";

const SubAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          navigate("/");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/admin/getDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Set the admin data to the response.data.results
          setAdminData(response.data.results);
          console.log("Admin Data:", response.data.results); // Log the correct property
        } else {
          toast.error("Failed to fetch admin data.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Error fetching admin data.");
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  return (
    <div className="bg-white min-h-screen flex flex-col overflow-hidden">
      <ToastContainer />
      <div className="flex-grow flex flex-col items-center font-raleway px-5 py-2">
        <div className="flex flex-col justify-center items-center mb-4">
          <Button
            icons={<FaBars />}
            onClick={() => setIsMenuOpen(true)}
            className={`text-2xl md:hidden absolute top-5 right-5`}
          />
          <Headers
            h1={`Patan Multiple Campus`}
            span={`Complain Management System`}
            address={`Patandhoka, Lalitpur-13`}
          />
        </div>
        <div className="flex flex-col md:flex-row flex-grow w-full relative">
          <Aside isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className="w-full flex flex-col p-4">
            {loading ? (
              <div>Loading...</div>
            ) : adminData ? (
              <div className="bg-slate-200 shadow-slate-500 p-4 rounded shadow-lg text-center flex flex-col justify-center items-center w-[50vw]">
                <h2 className="text-xl font-bold mb-4">Admin Information</h2>
                <p>
                  <strong>ID:</strong> {adminData.Aid}
                </p>
                <p>
                  <strong>Name:</strong> {adminData.name}
                </p>
                <p>
                  <strong>Email:</strong> {adminData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {adminData.phone}
                </p>
                <p>
                  <strong>Role:</strong> {adminData.role}
                </p>
              </div>
            ) : (
              <p>No admin data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdmin;
