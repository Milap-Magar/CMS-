import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./components/Dashboard.component";
import PrivateRoutes from "./private/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
