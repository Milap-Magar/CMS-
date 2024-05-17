import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         setError("No token found");
  //         return;
  //       }

  //       const res = await axios.get("http://localhost:8080/dashboard", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setEmail(res.data.email);
  //     } catch (err) {
  //       setError(err.response?.data?.error || "Error fetching data");
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Dashboard Email: {email}</div>;
};

export default Dashboard;
