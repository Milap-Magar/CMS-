import React, { useState } from "react";
import reg_validation from "../validation/register-validation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../assets/background.jpg";
import Logo from "../assets/logo.png";

function Register() {
  const [values, setValues] = useState({
    name: "",
    DOB: "",
    symbol: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    program: "",
    semester: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
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
    console.log("🚀 ~ handleSubmit ~ values:", values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/user/register",
          values
        );

        if (response.status === 200) {
          setApiResponse({
            success: true,
            message: "Registration successful!",
          });
          console.log("Registration successful:", response.data);
          navigate("/user/login");
        } else {
          setApiResponse({
            success: false,
            message: response.data.error || "Registration failed",
          });
          console.log("Registration failed:", response.data);
        }
      } catch (error) {
        setApiResponse({
          success: false,
          message: "An error occurred. Please try again.",
        });
        console.error("Error:", error);
      }
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-cover bg-center  py-12 px-4 sm:px-6 lg:px-8`}
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
            {/* Form fields go here, unchanged */}
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
                autoComplete="name"
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
                name="dob"
                type="date"
                autoComplete="bday"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.dob ? "border-red-500" : ""
                }`}
                placeholder="Enter your date of birth"
                value={values.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs italic">{errors.dob}</p>
              )}
            </div>

            {/* done */}

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
                type="number"
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
                autoComplete="email"
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
                autoComplete="password"
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
                htmlFor="address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="address"
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
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                autoComplete="tel"
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
                htmlFor="program"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Program
              </label>
              <select
                id="program"
                name="program"
                autoComplete="program"
                required
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.program ? "border-red-500" : ""
                }`}
                placeholder="Enter your program"
                value={values.program}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Program
                </option>
                <option value="engineering">Engineering</option>
                <option value="medicine">Medicine</option>
                <option value="science">Science</option>
                <option value="arts">Arts</option>
                <option value="business">Business</option>
                <option value="law">Law</option>
                <option value="humanities">Humanities</option>
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

            <div className="flex items-center justify-center gap-5">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
              <Link to={"/user/login"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Log In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Validation Error
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please fill out all the required fields correctly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {apiResponse && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {apiResponse.success ? "Success" : "Error"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {apiResponse.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setApiResponse(null)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
