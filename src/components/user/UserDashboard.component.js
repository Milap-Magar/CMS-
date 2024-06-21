import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.component";
import Main from "./Main.component";
import axios from "axios";

const UserDashboard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          setError("No token found");
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

    fetchDashboardData();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex bg-slate-200 h-screen w-full body">
          <Sidebar userData={userData} />
          <Main userData={userData} error={error} />
        </div>
      )}
    </>
  );
};

export default UserDashboard;
