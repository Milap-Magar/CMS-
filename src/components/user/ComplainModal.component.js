import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ComplainModal = ({ data }) => {
  // console.log("🚀 ~ ComplainModal ~ data:", data);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: data?.email || "",
    title: "",
    description: "",
    category: "",
    student_id: data?.sid || "",
    complain_to: "admin",
  });

  useEffect(() => {
    if (data?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: data.email,
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Submitting form data:", formData);

    const sanitizedData = { ...formData };
    Object.keys(sanitizedData).forEach((key) => {
      if (sanitizedData[key] === undefined) {
        sanitizedData[key] = null;
      }
    });

    try {
      const token = localStorage.getItem("Token");

      if (!token) {
        console.log("Token not found, redirecting to login.");
        navigate("/");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/complaints",
        sanitizedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        toast.success("Complaint submitted successfully!", {
          className: "custom-toast",
        });

        // Reset the form data after successful submission
        setFormData({
          email: data?.email || "",
          title: "",
          description: "",
          category: "",
          student_id: data?.sid || "",
          complain_to: "admin",
        });
      } else {
        toast.error("Failed to submit complaint.", {
          className: "custom-toast",
        });
      }
    } catch (error) {
      if (error.response) {
        // console.error("Error response:", error.response);
        toast.error(
          `Failed to submit complaint: ${
            error.response.data.message || "Server error"
          }`,
          {
            className: "custom-toast",
          }
        );
      } else if (error.request) {
        // console.error("Error request:", error.request);
        toast.error("No response received from the server.", {
          className: "custom-toast",
        });
      } else {
        console.error("Error message:", error.message);
        toast.error("An error occurred while submitting the complaint.", {
          className: "custom-toast",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer limit={1} toastClassName="custom-toast-container" />
      <div className="min-h-screen w-full flex flex-col items-start justify-center bg-amber-100 overflow-hidden">
        <div className="flex py-4 px-5">
          <IoIosArrowForward className="h-7 w-8" />
          <span className="text-xl font-mono">Register Complaint</span>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg shadow-amber-400 w-full max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-semibold text-center text-amber-700 mb-6">
              Submit a Complaint
            </h2>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="md:w-1/2">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="md:w-1/2 mb-4 md:mb-0">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="complain"
                >
                  Complain To <small>(Eg: Administration)</small>
                </label>
                <select
                  name="complain_to" // Updated to complain_to
                  id="complain"
                  value={formData.complain_to} // Updated to formData.complain_to
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="" disabled>
                    Select Complaint
                  </option>
                  <option value="Administration">Administration</option>
                  <option value="Accounts & Billing">Accounts & Billing</option>
                  <option value="General">General</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Technical">Technical</option>
                <option value="Non-Technical">Non-Technical</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description <small>(in 200 words or less)</small>
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ComplainModal;
