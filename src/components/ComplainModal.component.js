import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComplainModal = ({ userData }) => {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    description: "",
    faculty: userData?.faculty || "",
    semester: userData?.semester || "",
  });

  useEffect(() => {
    if (userData?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: userData.email,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Complaint submitted successfully!", {
          className: "custom-toast",
        });
        // Clear form after successful submission, keeping user data intact
        setFormData({
          email: userData?.email || "",
          title: "",
          description: "",
          faculty: userData?.faculty || "",
          semester: userData?.semester || "",
        });
      } else {
        toast.error("Failed to submit complaint.", {
          className: "custom-toast",
        });
      }
    } catch (error) {
      toast.error("An error occurred while submitting the complaint.", {
        className: "custom-toast",
      });
    }
  };

  return (
    <>
      <ToastContainer limit={1} toastClassName="custom-toast-container" />
      <div className="min-h-screen w-full flex items-center justify-center bg-amber-100 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg shadow-amber-400 w-full max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center text-amber-700 mb-6">
            Submit a Complaint
          </h2>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            {/* <div className="md:w-1/2 mb-4 md:mb-0">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                readOnly={!!userData?.email}
              />
            </div> */}

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
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
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
          {/* 
          {!userData?.faculty && (
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="faculty"
              >
                Faculty
              </label>
              <select
                name="faculty"
                id="faculty"
                value={formData.faculty}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="" disabled>
                  Select Faculty
                </option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Business">Business</option>
                <option value="Law">Law</option>
              </select>
            </div>
          )}

          {!userData?.semester && (
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="semester"
              >
                Semester
              </label>
              <select
                name="semester"
                id="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="" disabled>
                  Select Semester
                </option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>
          )} */}

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ComplainModal;
