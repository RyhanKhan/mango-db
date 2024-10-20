import React, { useState, useEffect } from "react";
import MetricCard from "../components/MetricCard.jsx";
import GraphComponent from "../components/GraphComponent.jsx";
import FarmAlert from "../components/FarmAlert.jsx"; // Import the new FarmAlert component

export default function Home() {
  // Define the metrics (names and endpoints)
  const metrics = [
    { name: "Humidity", endpoint: "/humidity" },
    { name: "Soil pH", endpoint: "/soil_pH" },
    { name: "Nitrogen Content", endpoint: "/nitrogen_content" },
    { name: "Soil Moisture", endpoint: "/soil_moisture" },
    { name: "Temperature", endpoint: "/temperature" },
    { name: "Precipitation", endpoint: "/precipitation" },
  ];

  // State to store the currently selected metric for the graph
  const [selectedMetric, setSelectedMetric] = useState(metrics[0].name);

  // State to store the farm status
  const [farmStatus, setFarmStatus] = useState("All good");

  // Placeholder: Function to simulate getting all metrics scores
  const getAllMetricsScore = () => {
    // Simulate a score for demonstration purposes
    return Math.random() * 100;
  };

  // UseEffect to update the farm status based on metric values
  useEffect(() => {
    // Fetch and calculate a score from backend metrics
    const score = getAllMetricsScore();

    if (score >= 80) {
      setFarmStatus("All good");
    } else if (score >= 50 && score < 80) {
      setFarmStatus("Needs some slight attention");
    } else {
      setFarmStatus("Needs immediate attention");
    }
  }, []); // Run only on mount for now, you can add more dependencies if needed

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Soil Metrics Dashboard
      </h1>
      {/* Farm Status */}
      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Status of Ram Lal's Farm:{" "}
          <span
            className={`${
              farmStatus === "All good"
                ? "text-green-600"
                : farmStatus === "Needs some slight attention"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {farmStatus}
          </span>
        </h2>
      </div>
      {/* Farm Alert Section */}
      <FarmAlert /> {/* Adding the alert section below the status */}
      {/* Layout for Metric Cards and Graph */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Metrics Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Farm Metrics
          </h2>
          {/* Render MetricCard components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.name}
                metricName={metric.name}
                endpoint={`http://localhost:5000${metric.endpoint}`}
              />
            ))}
          </div>
        </div>

        {/* Graph Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Real-Time Graph</h2>

          {/* Dropdown for selecting metric */}
          <label htmlFor="metric-select" className="mr-2 font-medium">
            Select Metric:
          </label>
          <select
            id="metric-select"
            className="border p-2 rounded-md mb-4"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            {metrics.map((metric) => (
              <option key={metric.name} value={metric.name}>
                {metric.name}
              </option>
            ))}
          </select>

          {/* Real-time graph component */}
          <GraphComponent selectedMetric={selectedMetric} />
        </div>
      </div>
    </div>
  );
}
