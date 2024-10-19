import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart
import "chart.js/auto"; // Auto-import chart.js to support charts

const GraphComponent = ({ selectedMetric }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: selectedMetric,
        data: [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  });

  // Use Effect to simulate real-time graph updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      const newDataPoint = Math.random() * 100;

      setChartData((prevData) => ({
        ...prevData,
        labels: [...prevData.labels, newTime],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newDataPoint],
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [selectedMetric]);

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: `${selectedMetric} Value`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default GraphComponent;
