import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComplaintsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaintsData = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:8080/handle/complaints",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const complaints = response.data.complaints;
          const categories = ["Technical", "Non-Technical"];
          const statusCounts = {
            pending: 0,
            resolved: 0,
          };

          complaints.forEach((complaint) => {
            if (complaint.status === "pending") {
              statusCounts.pending += 1;
            } else if (complaint.status === "resolved") {
              statusCounts.resolved += 1;
            }
          });

          setChartData({
            labels: categories,
            datasets: [
              {
                label: "Pending Complaints",
                data: [
                  complaints.filter(
                    (c) => c.category === "Technical" && c.status === "pending"
                  ).length,
                  complaints.filter(
                    (c) =>
                      c.category === "Non-Technical" && c.status === "pending"
                  ).length,
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "Resolved Complaints",
                data: [
                  complaints.filter(
                    (c) => c.category === "Technical" && c.status === "resolved"
                  ).length,
                  complaints.filter(
                    (c) =>
                      c.category === "Non-Technical" && c.status === "resolved"
                  ).length,
                ],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          });
          setLoading(false);
        } else {
          setError("Failed to fetch complaints");
          setLoading(false);
        }
      } catch (err) {
        setError(err.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchComplaintsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative w-full h-auto p-4 rounded-2xl shadow-lg shadow-fuchsia-400 overflow-hidden">
      <style>
        {`
          .gradient-background {
            background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb, #a18cd1, #ff9a9e);
            background-size: 300% 300%;
            animation: gradientAnimation 10s ease infinite;
          }

          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="gradient-background absolute inset-0 z-0"></div>
      <div className="relative z-10">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Complaints Overview:
        </h2>
        {chartData ? (
          <div className="h-[100px] md:h-[200px]">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    type: "linear",
                  },
                },
              }}
            />
          </div>
        ) : (
          <div className="text-white">No data available</div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsChart;
