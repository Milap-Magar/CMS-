import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Aside from "../components/admin/Aside";
import Button from "../components/Button";
import Headers from "../components/admin/Headers.component";

const ComplaintHistory = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
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
          const sortedComplaints = response.data.complaints.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setComplaints(sortedComplaints);
        } else {
          setError("Failed to fetch complaints");
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
        setLoading(false);
      }
    };

    fetchComplaints();
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
          <div className="w-full md:w-[80%] p-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <table className="min-w-full bg-slate-200 shadow-lg shadow-slate-400">
                <thead>
                  <tr className="border-[2px] border-slate-400 rounded-xl">
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Title
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Description
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Category
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Student ID
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Email
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Status
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Filed On
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr
                      key={complaint.complaint_Id}
                      className="border-[2px] border-slate-400"
                    >
                      <td className="p-2 border-[2px] border-slate-400">
                        {complaint.title}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {complaint.description}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {complaint.category}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {complaint.student_id}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {complaint.email}
                      </td>
                      <td
                        className={`p-2 border-[2px] border-slate-400 ${
                          complaint.status === "pending"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {complaint.status}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {new Date(complaint.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintHistory;
