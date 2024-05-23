import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoutes = () => {
  const token = localStorage.getItem("Token");
  // console.log("Retrieved token from localStorage:", token);

  let isValidToken = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // console.log("Decoded token:", decodedToken);
      const currentTime = Date.now() / 1000;
      isValidToken = decodedToken.exp > currentTime;
      // console.log("Token is valid:", isValidToken);
    } catch (error) {
      console.error("Failed to decode token:", error);
      alert("Failed to login", error);
    }
  } else {
    console.log("No token found, redirecting to login.");
  }

  // console.log("Rendering PrivateRoutes with isValidToken:", isValidToken);
  return isValidToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
