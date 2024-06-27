import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.component";
import SettingModal from "../SettingModal";

const AccountSettings = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          navigate("/");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/user/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token || !userData) {
          navigate("/");
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/student/data/${userData.sid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setStudentData(response.data.data);
        } else {
          toast.error("Failed to fetch student data.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error("Error fetching student data.");
      }
    };
    if (userData) {
      fetchStudentData();
    }
  }, [userData, navigate]);

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill out both password fields.");
      return;
    }
    try {
      const token = localStorage.getItem("Token");
      if (!token || !userData) {
        navigate("/");
        return;
      }
      const response = await axios.put(
        `http://localhost:8080/student/password/${userData.sid}`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setIsModalOpen(false);
        navigate("/user/login");
      } else {
        toast.error(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error updating password.");
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex bg-slate-200 h-screen w-full body">
          <Sidebar userData={userData} />
          <div className="w-full flex flex-col p-4">
            {studentData ? (
              <div className="bg-amber-100 p-4 rounded shadow-lg shadow-amber-300 text-center flex flex-col justify-center items-center w-[50vw]">
                <h2 className="text-xl font-bold mb-4">Student Information</h2>
                <p>
                  <strong>SID:</strong> {studentData.Sid}
                </p>
                <p>
                  <strong>Name:</strong> {studentData.name}
                </p>
                <p>
                  <strong>Email:</strong> {studentData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {studentData.phone}
                </p>
                <p>
                  <strong>Address:</strong> {studentData.address}
                </p>
                <p>
                  <strong>Program:</strong> {studentData.program}
                </p>
                <p>
                  <strong>Semester:</strong> {studentData.semester}
                </p>
                <p>
                  <strong>Role:</strong> {studentData.role}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(studentData.Created_At).toLocaleString()}
                </p>
                <p>
                  <strong>Approved By:</strong> {studentData.Approved_By}
                </p>
                <button
                  className="mt-4 border px-2 py-1 bg-blue-400 hover:bg-blue-500 rounded-xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  Update Password
                </button>
              </div>
            ) : (
              <p>Loading student data...</p>
            )}
          </div>
          {isModalOpen && (
            <SettingModal
              title="Update Password"
              onClose={() => setIsModalOpen(false)}
            >
              <div className="flex flex-col p-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mb-4 p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mb-4 p-2 border rounded"
                />
                <button
                  onClick={handlePasswordUpdate}
                  className="mt-4 border px-2 py-1 bg-blue-400 hover:bg-blue-500 rounded-xl"
                >
                  Update Password
                </button>
              </div>
            </SettingModal>
          )}
        </div>
      )}
    </>
  );
};

export default AccountSettings;
