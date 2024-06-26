import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const ComplainDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // State for user data

  // Fetch complaint details and user data
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          setError("No token found");
          toast.error("No token found, redirecting to login.");
          setLoading(false);
          navigate("/");
          return;
        }

        const [complaintResponse, userResponse] = await Promise.all([
          axios.get(`http://localhost:8080/admin/complaints/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/user/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (complaintResponse.data.success) {
          setComplaint(complaintResponse.data.complaint);
        } else {
          setError("Failed to fetch complaint details");
          toast.error("Failed to fetch complaint details");
        }

        setUserData(userResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
        toast.error(err.response?.data?.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id, navigate]);

  return (
    <>
      <ToastContainer limit={1} toastClassName="custom-toast-container" />
      <div className="min-h-screen w-full flex flex-col items-start justify-center bg-amber-100 overflow-hidden">
        <div className="flex py-4 px-5">
          <IoIosArrowForward className="h-7 w-8" />
          <span className="text-xl font-mono">Complaint Details</span>
        </div>
        <div className="w-full">
          <div className="w-full md:w-[80%] p-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              complaint && (
                <div className="bg-slate-200 shadow-lg shadow-slate-400 p-4 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Complaint Details</h2>
                  <p>
                    <strong>Title:</strong> {complaint.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {complaint.description}
                  </p>
                  <p>
                    <strong>Category:</strong> {complaint.category}
                  </p>
                  <p>
                    <strong>Student ID:</strong> {complaint.student_id}
                  </p>
                  <p>
                    <strong>Email:</strong> {complaint.email}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`ml-2 ${
                        complaint.status === "pending"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </p>
                  <p>
                    <strong>Filed On:</strong>{" "}
                    {new Date(complaint.created_at).toLocaleString()}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplainDetails;
