import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Aside from "../components/admin/Aside";
import Button from "../components/admin/Button";
import Headers from "../components/admin/Headers.component";

import { FaBars } from "react-icons/fa";

const View = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          setError("No token found");
          setLoading(false);
          navigate("/");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/handle/complaints",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setComplaints(response.data.complaints);
        } else {
          setError("Failed to fetch complaints");
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [navigate]);

  return (
    <div className="bg-white overflow-x-hidden min-h-screen flex flex-col">
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
        </div>
      </div>
    </div>
  );
};

export default View;
