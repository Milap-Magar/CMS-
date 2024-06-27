import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { IoIosArrowForward } from "react-icons/io";

const ComplainDetails = ({ userData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

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
          `http://localhost:8080/complaints?student_id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setComplaints(response.data.complaints);
        } else {
          setError("Failed to fetch complaints");
        }

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [id, navigate]);

  return (
    <>
      <div className="flex bg-slate-200 h-screen w-full body">
        <div className="min-h-screen w-full flex flex-col items-start justify-center bg-amber-100 overflow-y-scroll overflow-x-hidden pt-[40vh]">
          <div className="flex py-4 px-5">
            <IoIosArrowForward className="h-7 w-8" />
            <span className="text-xl font-mono">Complaint Details: </span>
          </div>
          <div className="w-full">
            <div className="w-full md:w-[80%] p-4">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : complaints.length === 0 ? (
                <div>No complaints found for this student ID.</div>
              ) : (
                complaints.map((complaint, index) => (
                  <div
                    key={complaint.id}
                    className="bg-slate-200 shadow-lg shadow-slate-400 p-4 rounded-lg mb-4"
                  >
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplainDetails;
