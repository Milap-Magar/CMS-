import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import Aside from "../components/admin/Aside";
import Button from "../components/Button";
import Headers from "../components/admin/Headers.component";
import Details from "./Details";

const View = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

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

    fetchComplaints();
  }, [navigate]);

  const handleStatusChange = async (complaintId) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/handle/complaints/${complaintId}`,
        { status: "resolved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.complaint_Id === complaintId
              ? { ...complaint, status: "resolved" }
              : complaint
          )
        );
      } else {
        setError("Failed to update status");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error updating status");
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    try {
      const token = localStorage.getItem("Token");

      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/handle/complaints/${complaintId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setComplaints((prevComplaints) =>
          prevComplaints.filter(
            (complaint) => complaint.complaint_Id !== complaintId
          )
        );
      } else {
        setError("Failed to delete complaint");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting complaint");
    }
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

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
              <table className="min-w-full bg-slate-200 shadow-lg shadow-slate-400 ">
                <thead>
                  <tr className="border-[2px] border-slate-400 rounded-xl text-center">
                    <th className=" p-2 border-[2px] border-slate-700">
                      Title
                    </th>
                    <th className=" p-2 border-[2px] border-slate-700">
                      Description
                    </th>
                    <th className=" p-2 border-[2px] border-slate-700">
                      Category
                    </th>
                    <th className=" p-2 border-[2px] border-slate-700">
                      Status
                    </th>
                    <th className=" p-2 border-[2px] border-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr
                      key={complaint.complaint_Id}
                      className="border-[2px] border-slate-400 text-center"
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
                      <td
                        className={`p-2 border-[2px] border-slate-400 ${
                          complaint.status === "pending"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {complaint.status}
                      </td>
                      <td className="p-2 flex gap-2">
                        {complaint.status === "pending" && (
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() =>
                              handleStatusChange(complaint.complaint_Id)
                            }
                          >
                            Mark as Resolved
                          </button>
                        )}
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                          onClick={() => handleViewDetails(complaint)}
                        >
                          View Details
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() =>
                            handleDeleteComplaint(complaint.complaint_Id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Details
        isOpen={!!selectedComplaint}
        onClose={closeModal}
        complaint={selectedComplaint}
      />
    </div>
  );
};

export default View;
