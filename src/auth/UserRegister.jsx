import React, { useState } from "react";
import reg_validation from "../validation/register-validation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../assets/background.jpg";
import Logo from "../assets/logo.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
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

  console.log("🚀 ~ Register ~ values:", values);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = reg_validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/user/register",
          values
        );

        if (response.status === 200) {
          toast.success("Registration successful! Redirecting to login...");
          console.log("Registration successful:", response.data);
          setTimeout(() => navigate("/user/login"), 2000);
        } else {
          toast.error(response.data.error || "Registration failed");
          console.log("Registration failed:", response.data);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error("Error:", error);
      }
    } else {
      console.log("Validation errors:", validationErrors);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="max-w-lg w-full">
        <div className="bg-white shadow-2xl shadow-slate-500 rounded-lg px-8 pt-6 pb-8 mb-4">
          <figure>
            <img
              src={Logo}
              alt="logo"
              className="h-[30vh] w-[80vw] md:h-[35vh] md:w-[50vw]"
            />
          </figure>
          <h2 className="text-center text-xl font-medium text-gray-900 mb-4 font-mono">
            Student Registration Form
          </h2>
          <form onSubmit={handleSubmit}>
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
              <Link
                to="/user/login"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
