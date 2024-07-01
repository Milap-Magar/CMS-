import React, { useState, useEffect } from "react";
import axios from "axios";

const Recent = () => {
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:8080/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log('res', response)
        const data = response.data;
        if (data.complaints.length > 0) {
          // console.log('data'.data?.complaints)
          const latestComplaint = data.complaints.slice().reverse();
          setComplaint(latestComplaint[0]);
          // console.log("Latest Complaint:", latestComplaint);
        } else {
          console.log("No complaints available");
        }
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  return (
    <div className="flex-grow overflow-y-auto font-raleway absolute bottom-0 sm:bottom-2 md:bottom-10 w-[75vw] md:w-[68vw] h-[200px]">
      <div className="p-4 border bg-gradient-to-b from-purple-200 to-purple-800 rounded-2xl shadow-lg shadow-sky-400">
        <h2 className="text-xl font-semibold mb-4">Most Recent Complaint:</h2>
        {complaint ? (
          <div className="p-4 bg-slate-100 rounded-md shadow">
            <h3 className="font-bold">{complaint.title}</h3>
            <p>{complaint.description}</p>
            <span className="text-sm text-gray-500">
              Created at: {new Date(complaint.created_at).toLocaleString()}
            </span>
          </div>
        ) : (
          <p>No recent complaints available.</p>
        )}
      </div>
    </div>
  );
};

export default Recent;
