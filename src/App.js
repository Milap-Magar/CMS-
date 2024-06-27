import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./auth/Main";

// Student Imports
import UserRegister from "./auth/UserRegister";
import UserLogin from "./auth/UserLogin";
import UserDashboard from "./components/user/UserDashboard.component";
import Complaint from "./components/user/Complaint.component";
import DetailComplaint from "./components/user/Details.component";
import AccountSettings from "./components/user/Settings.component";

// Admin Imports
import AdminLogin from "./auth/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard.component";
import View from "./pages/View.page";
import ComplaintHistory from "./pages/ComplainHistory.page";
import SubAdmin from "./pages/SubAdmin.page";
import Total from "./pages/Total.page";
import Settings from "./pages/Settings.pages";

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
        <Route path="/user/complaintdetails" element={<DetailComplaint />} />
        <Route path="/user/settings" element={<AccountSettings />} />

        {/* Admin Routes  */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/handlecomplaint" element={<View />} />
        <Route path="/admin/complainhistory" element={<ComplaintHistory />} />
        <Route path="/admin/sub-admin" element={<SubAdmin />} />
        <Route path="/admin/total" element={<Total />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
