import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaBars } from "react-icons/fa";

import Button from "./Button";
import Aside from "./Aside";
import Main from "../../pages/Main.page";
import Headers from "./Headers.component";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white overflow-x-hidden min-h-full flex flex-col overflow-hidden">
      {userData ? (
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
            <Main />
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default Dashboard;
