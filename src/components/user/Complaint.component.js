import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Sidebar from "./Sidebar.component";
import ComplainModal from "./ComplainModal.component";
import { useNavigate } from "react-router-dom";

const Complaint = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");
  // console.log(userData);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
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

        // console.log(res);

        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex bg-slate-200 h-screen w-full body">
          <Sidebar userData={userData} />
          <ComplainModal data={userData} />
        </div>
      )}
    </>
  );
};

export default Complaint;
