import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./auth/AdminLogin";
import UserRegister from "./auth/UserRegister";
import Main from "./auth/Main";
import UserLogin from "./auth/UserLogin";

import Dashboard from "./components/Dashboard.component";

import PrivateRoutes from "./private/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/user" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/admin" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
