import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./auth/AdminLogin";
import UserRegister from "./auth/UserRegister";
import Main from "./auth/Main";
import UserLogin from "./auth/UserLogin";

import PrivateRoutes from "./private/PrivateRoutes";

import UserDashboard from "./components/UserDashboard.component";
import AdminDashboard from "./components/AdminDashboard.component";
import Complaint from "./components/Complaint.component";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/user" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="complaint" element={<Complaint />} />
        </Route>

        <Route path="/admin" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
