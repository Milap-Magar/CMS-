import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import Aside from "../components/admin/Aside";
import Button from "../components/admin/Button";
import Headers from "../components/admin/Headers.component";

const Total = () => {
  const navigate = useNavigate();

  const [totals, setTotals] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

        // console.log("🚀 ~ fetchTotals ~ response:", response);

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
        </div>
        <div className="flex flex-col md:flex-row flex-grow w-full relative">
          <Aside isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className="w-full md:w-[80%] p-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <table className="min-w-full bg-slate-200 shadow-lg shadow-slate-400">
                <thead>
                  <tr className="border-[2px] border-slate-400 rounded-xl">
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Name
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Symbol
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Email
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Phone
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Address
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Program
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Semester
                    </th>
                    <th className="text-left p-2 border-[2px] border-slate-700">
                      Filed On
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {totals.map((total) => (
                    <tr
                      key={total.Sid}
                      className="border-[2px] border-slate-400"
                    >
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
                      <td className="p-2 border-[2px] border-slate-400">
                        {total.address}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {total.program}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {total.semester}
                      </td>
                      <td className="p-2 border-[2px] border-slate-400">
                        {new Date(total.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
