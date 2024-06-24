import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("Token");
  let isValidToken = false;
  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      isValidToken = decodedToken.exp > currentTime;

      if (isValidToken) {
        userRole = decodedToken.role;
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
      alert("Failed to login. Please try again.");
    }
  } else {
    console.log("No token found, redirecting to login.");
  }

  if (isValidToken) {
    return <Navigate to="/user/dashboard" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;
