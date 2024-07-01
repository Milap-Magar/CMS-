import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../components/Button";
import Headers from "../components/admin/Headers.component";
import { FaBars, FaFileSignature } from "react-icons/fa";
import Aside from "../components/admin/Aside";
import { useNavigate } from "react-router-dom";

const SubAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    role: "admin",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
    };

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d+$/.test(formData.phone.trim())) {
      errors.phone = "Phone number must contain only digits";
      valid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all the required feildset", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/register",
        formData
      );
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Error registering admin. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error registering admin:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col overflow-hidden">
      <ToastContainer /> {/* Toast Container for notifications */}
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
        <div className="flex flex-col md:flex-row flex-grow w-full relative overflow-x-hidden overflow-y-scroll">
          <Aside isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <form
            onSubmit={handleSubmit}
            className="w-[75vw] sm:w-[60vw] md:w-[50vw] h-auto bg-slate-200 px-10 py-2
            flex flex-col justify-center absolute top-0 left-8 sm:left-36 md:left-96  rounded-xl
            shadow-xl shadow-slate-700"
            noValidate
          >
            <div className="flex pb-4">
              <FaFileSignature className="h-5 w-5" />
              <span>Add Admin:</span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 p-1 block w-full border  border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formErrors.email ? "border-red-500" : ""
                }`}
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1 p-1">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 p-1 block w-full border  border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formErrors.password ? "border-red-500" : ""
                }`}
                required
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1 p-1">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 p-1 block w-full border  border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1 p-1">
                  {formErrors.name}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-1 p-1 block w-full border  border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formErrors.phone ? "border-red-500" : ""
                }`}
                required
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1 p-1">
                  {formErrors.phone}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 p-1 block w-full border  border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formErrors.address ? "border-red-500" : ""
                }`}
                required
              />
              {formErrors.address && (
                <p className="text-red-500 text-xs mt-1 p-1">
                  {formErrors.address}
                </p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubAdmin;
