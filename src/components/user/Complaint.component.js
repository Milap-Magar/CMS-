import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Sidebar from "./Sidebar.component";
import ComplainModal from "./ComplainModal.component";

const Complaint = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          setError("No token found");
          return;
        }

        const res = await axios.get("http://localhost:8080/complaints", {
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

    fetchComplaints();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex bg-slate-200 h-screen w-full body">
          <Sidebar userData={userData} />
          <ComplainModal />
        </div>
      )}
    </>
  );
};

export default Complaint;
