import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../Button";
import Aside from "./Aside";
import Main from "../../pages/Main.page";
import Headers from "./Headers.component";
import Loading from "../Loading";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          setError("No token found");
          setLoading(false);
          navigate("/");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
        setLoading(false);
      }
    };

    const loadingTimer = setTimeout(() => {
      setShowLoadingScreen(false);

      toast.success(`Welcome Admin!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, 2000);

    fetchDashboardData();

    return () => clearTimeout(loadingTimer);
  }, [navigate]);

  if (showLoadingScreen) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-slate-300 to-slate-500 overflow-x-hidden min-h-full flex flex-col overflow-hidden">
      {userData ? (
        <div className="flex-grow flex flex-col items-center font-raleway px-5 py-2">
          <div className="flex flex-col justify-center items-center mb-4">
            <Button
              icons={<FaBars />}
              onClick={() => setIsMenuOpen(true)}
              className="text-2xl md:hidden absolute top-5 right-5"
            />
            <Headers
              // h1="Patan Multiple Campus"
              span="Student Complain Management System"
              // address="Patandhoka, Lalitpur-13"
            />
          </div>
          <div className="flex flex-col md:flex-row flex-grow w-full relative">
            <Aside isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Main />
          </div>
        </div>
      ) : (
        navigate("/")
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
