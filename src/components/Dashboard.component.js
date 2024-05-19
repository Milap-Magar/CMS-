import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.component";
import Main from "./Main.component";
import axios from "axios";


const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          setError("No token found");
          return;
        }
  
        const res = await axios.get("http://localhost:8080/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the Authorization header
          },
        });
  
        setEmail(res.data.email);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []); // Empty dependency array ensures that the effect runs only once, when the component mountsx
  

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex bg-slate-200 h-screen w-full body">    
          <Sidebar />
          <Main email={email} error={error} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
