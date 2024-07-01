import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import reg_validation from "../validation/register-validation";

const AddStudentForm = ({ isOpen, onClose, onAddStudent }) => {
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = reg_validation(values);
    setErrors(validationErrors);
    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        validationErrors
      );
      if (response.data.success) {
        onAddStudent(response.data.data);
        onClose();
        toast.success("Student added successfully!");
        navigate("/admin/total");
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
          <div className="flex justify-end">
            <MdClose className="cursor-pointer" size={24} onClick={onClose} />
          </div>

          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                name="DOB" // Use the correct state key
                type="date"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.dob ? "border-red-500" : ""
                }`}
                value={values.DOB} // Use the correct state key
                onChange={handleChange}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs italic">{errors.dob}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="symbol"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Symbol No
              </label>
              <input
                id="symbol"
                name="symbol"
                type="text"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.symbol ? "border-red-500" : ""
                }`}
                placeholder="Enter your symbol number"
                value={values.symbol}
                onChange={handleChange}
              />
              {errors.symbol && (
                <p className="text-red-500 text-xs italic">{errors.symbol}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="Enter your phone number"
                value={values.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="Enter your address"
                value={values.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-red-500 text-xs italic">{errors.address}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="program"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Program
              </label>
              <select
                id="program"
                name="program"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.program ? "border-red-500" : ""
                }`}
                value={values.program}
                onChange={handleChange}
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
              {errors.program && (
                <p className="text-red-500 text-xs italic">{errors.program}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="semester"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Semester
              </label>
              <select
                id="semester"
                name="semester"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.semester ? "border-red-500" : ""
                }`}
                value={values.semester}
                onChange={handleChange}
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
              {errors.semester && (
                <p className="text-red-500 text-xs italic">{errors.semester}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudentForm;
