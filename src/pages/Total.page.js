import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import Aside from "../components/admin/Aside";
import Button from "../components/admin/Button";
import Headers from "../components/admin/Headers.component";
import TotalDetails from "./Details.total";
import AddStudentForm from "./AddStudent.modal";

const Total = () => {
  const navigate = useNavigate();

  const [totals, setTotals] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTotal, setSelectedTotal] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          setError("No token found");
          setLoading(false);
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:8080/admin/total", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const sortedTotals = response.data.totals.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setTotals(sortedTotals);
        } else {
          setError("Failed to fetch totals");
        }
      } catch (err) {
        console.error(
          "Error fetching totals:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.error || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTotals();
  }, [navigate]);

  const handleViewDetails = (total) => {
    setSelectedTotal(total);
  };

  const handleDeleteTotal = async (totalId) => {
    try {
      const token = localStorage.getItem("Token");

      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/admin/total/${totalId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setTotals((prevTotals) =>
          prevTotals.filter((total) => total.Sid !== totalId)
        );
      } else {
        setError("Failed to delete total");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting total");
    }
  };

  const handleAddStudent = (newStudent) => {
    setTotals((prevTotals) => [...prevTotals, newStudent]);
    setIsAddModalOpen(false); // Close modal after adding student
  };

  return (
    <div className="bg-white overflow-x-hidden min-h-screen flex flex-col">
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
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Student
          </button>
        </div>
        <div className="flex flex-col md:flex-row flex-grow w-full relative">
          <Aside isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className="w-full md:w-[80%] p-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <table className="min-w-full bg-slate-200 shadow-lg shadow-slate-400 text-center">
                <thead>
                  <tr className="border-[2px] border-slate-400 rounded-xl">
                    <th className=" p-2 border-[2px] border-slate-700">
                      Student ID
                    </th>
                    <th className=" p-2 border-[2px] border-slate-700">Name</th>
                    <th className=" p-2 border-[2px] border-slate-700">
                      Symbol
                    </th>
                    <th className=" p-2 border-[2px] border-slate-700">
                      Email
                    </th>
                    <th className=" p-2 border-[2px] border-slate-700">
                      Phone
                    </th>
                    <th className=" border-[2px] border-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {totals.map((total) => (
                    <tr
                      key={total.Sid}
                      className="border-[2px] border-slate-400 text-center"
                    >
                      <td className="p-2 border-[2px] border-slate-400">
                        {total.Sid}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {total.name}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {total.symbol}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {total.email}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {total.phone}
                      </td>
                      <td className="p-2 flex gap-2">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                          onClick={() => handleViewDetails(total)}
                        >
                          View Details
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteTotal(total.Sid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {selectedTotal && (
        <TotalDetails
          isOpen={!!selectedTotal}
          onClose={() => setSelectedTotal(null)}
          total={selectedTotal}
        />
      )}
      {/* Add Student Form Modal */}
      <AddStudentForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStudent={handleAddStudent}
      />
    </div>
  );
};

export default Total;
