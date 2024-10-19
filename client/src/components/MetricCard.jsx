import React, { useState, useEffect } from "react";

const MetricCard = ({ metricName, endpoint }) => {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("low");

  // Function to determine status based on value
  const getStatus = (val) => {
    if (val < 30) return "low";
    else if (val >= 30 && val <= 70) return "medium";
    return "high";
  };

  // Fetch the metric value from backend every 1000 ms
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint); // Example: 'http://localhost:5000/soil_moisture'
        const data = await response.json();
        setValue(data.value);
        setStatus(getStatus(data.value));
      } catch (error) {
        console.error("Error fetching metric:", error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // 1000 ms

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [endpoint]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-gray-800">{metricName}</h2>
      <p className="text-3xl font-bold text-gray-600">{value}</p>
      <p
        className={`text-sm mt-2 ${
          status === "low"
            ? "text-red-500"
            : status === "medium"
            ? "text-yellow-500"
            : "text-green-500"
        }`}
      >
        Status: {status}
      </p>
    </div>
  );
};

export default MetricCard;
