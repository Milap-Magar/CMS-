import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const ComplainModal = ({ userData }) => {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    description: "",
    category: "",
    student_id: userData?.sid || "",
    complain: "",
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

        setFormData({
          email: userData?.email || "",
          title: "",
          description: "",
          category: "",
          student_id: userData?.sid || "",
          complain_to: "",
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
      <div className="min-h-screen w-full flex flex-col items-start justify-center bg-amber-100">
        <div className="flex pb-10 px-5">
          <IoIosArrowForward className="h-7 w-8" />
          <span className="text-xl font-mono">Register Complaint</span>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg shadow-amber-400 w-full max-w-4xl mx-auto"
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
                  name="complain"
                  id="complain"
                  value={formData.complain}
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
