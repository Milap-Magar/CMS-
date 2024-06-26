import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md"; // Importing MdClose from react-icons/md

const AddStudentForm = ({ isOpen, onClose, onAddStudent }) => {
  const [values, setValues] = useState({
    name: "",
    DOB: "",
    symbol: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    program: "",
    semester: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        values
      );
      if (response.data.success) {
        onAddStudent(response.data.data); // Assuming the API returns the newly added student data
        onClose(); // Close the modal after successful addition
        toast.success("Student added successfully!");
      } else {
        console.error("Failed to add student:", response.data.error);
        toast.error("Failed to add student.");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Error adding student.");
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div
          className="bg-white p-8 rounded-lg shadow-lg"
          style={{ maxWidth: "80vw", maxHeight: "90vh", overflow: "auto" }}
        >
          {/* Close Icon */}
          <div className="flex justify-end">
            <MdClose className="cursor-pointer" size={24} onClick={onClose} />
          </div>

          {/* Form Content */}
          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* DOB Input */}
            <div className="mb-4">
              <label
                htmlFor="DOB"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={values.DOB}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Symbol Input */}
            <div className="mb-4">
              <label
                htmlFor="symbol"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Symbol:
              </label>
              <input
                type="text"
                id="symbol"
                name="symbol"
                value={values.symbol}
                onChange={handleChange}
                placeholder="Enter symbol"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="Enter phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Address Input */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={values.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Program Input */}
            <div className="mb-4">
              <label
                htmlFor="program"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Program:
              </label>
              <select
                id="program"
                name="program"
                value={values.program}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Program
                </option>
                <option value="BCA">Bachelor's in Computer Application</option>
                <option value="BBM">Bachelor's in Business Management</option>
                <option value="BBS">Bachelor's in Business Studies</option>
                <option value="BHM">Bachelor's in Hotel Management</option>
                <option value="BBA">
                  Bachelor's in Business Administration
                </option>
              </select>
            </div>

            {/* Semester Input */}
            <div className="mb-4">
              <label
                htmlFor="semester"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Semester:
              </label>
              <select
                id="semester"
                name="semester"
                value={values.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Semester
                </option>
                <option value="1">First</option>
                <option value="2">Second</option>
                <option value="3">Third</option>
                <option value="4">Fourth</option>
                <option value="5">Fifth</option>
                <option value="6">Sixth</option>
                <option value="7">Seventh</option>
                <option value="8">Eighth</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudentForm;
