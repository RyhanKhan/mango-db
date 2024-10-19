import React, { useState } from "react";
import MetricCard from "/Users/raihaanibnshakeel/Desktop/mango-db/client/src/components/MetricCard.jsx"; // Import the MetricCard component
import GraphComponent from "/Users/raihaanibnshakeel/Desktop/mango-db/client/src/components/GraphComponent.jsx"; // Import the GraphComponent component

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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Soil Metrics Dashboard
      </h1>

      {/* Render the six MetricCard components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.name}
            metricName={metric.name}
            endpoint={`http://localhost:5000${metric.endpoint}`}
          />
        ))}
      </div>

      {/* Dropdown for selecting metric */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Real-Time Graph</h2>
        <label htmlFor="metric-select" className="mr-2">
          Select Metric:
        </label>
        <select
          id="metric-select"
          className="border p-2 rounded-md"
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
  );
}
