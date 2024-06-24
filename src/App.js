import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./auth/AdminLogin";
import UserRegister from "./auth/UserRegister";
import Main from "./auth/Main";
import UserLogin from "./auth/UserLogin";

// import PrivateRoutes from "./private/PrivateRoutes";

import UserDashboard from "./components/user/UserDashboard.component";
import AdminDashboard from "./components/admin/AdminDashboard.component";
import Complaint from "./components/user/Complaint.component";
import View from "./pages/View.page";
import ComplaintHistory from "./pages/ComplainHistory.page";
import SubAdmin from "./pages/SubAdmin.page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/complaint" element={<Complaint />} />

        {/* Admin Routes  */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/handlecomplaint" element={<View />} />
        <Route path="/admin/complainhistory" element={<ComplaintHistory />} />
        <Route path="/admin/sub-admin" element={<SubAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
