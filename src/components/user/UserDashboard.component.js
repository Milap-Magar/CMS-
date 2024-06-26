import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.component";
import Main from "./Main.component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";

const UserDashboard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          setError("No token found");
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:8080/user/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
        setLoading(false);
      }
    };

    const loadingTimer = setTimeout(() => {
      setShowLoadingScreen(false);

      toast.success(`Welcome!`, {
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

  return (
    <>
      {showLoadingScreen ? (
        <Loading />
      ) : (
        <div className="flex bg-slate-200 h-screen w-full body">
          <Sidebar userData={userData} />
          <Main userData={userData} error={error} />
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default UserDashboard;
