// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2"; // Import Line chart
// import "chart.js/auto"; // Auto-import chart.js to support charts

// const GraphComponent = ({ selectedMetric }) => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: selectedMetric,
//         data: [],
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//         fill: true,
//       },
//     ],
//   });

//   // Use Effect to simulate real-time graph updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTime = new Date().toLocaleTimeString();
//       const newDataPoint = Math.random() * 100;

//       setChartData((prevData) => {
//         // Ensure we only keep 20 data points
//         const newLabels =
//           prevData.labels.length >= 20
//             ? prevData.labels.slice(1) // Remove the first label if we exceed 20
//             : prevData.labels;
//         const newData =
//           prevData.datasets[0].data.length >= 20
//             ? prevData.datasets[0].data.slice(1) // Remove the first data point if we exceed 20
//             : prevData.datasets[0].data;

//         return {
//           ...prevData,
//           labels: [...newLabels, newTime], // Add new time label
//           datasets: [
//             {
//               ...prevData.datasets[0],
//               data: [...newData, newDataPoint], // Add new data point
//             },
//           ],
//         };
//       });
//     }, 1000);

//     return () => clearInterval(interval); // Clean up the interval on unmount
//   }, [selectedMetric]);

//   return (
//     <div>
//       <Line
//         data={chartData}
//         options={{
//           responsive: true,
//           scales: {
//             x: {
//               title: {
//                 display: true,
//                 text: "Time",
//               },
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: `${selectedMetric} Value`,
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default GraphComponent;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

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

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      const newDataPoint = Math.random() * 100;

      setChartData((prevData) => {
        const newLabels =
          prevData.labels.length >= 20
            ? prevData.labels.slice(1)
            : prevData.labels;
        const newData =
          prevData.datasets[0].data.length >= 20
            ? prevData.datasets[0].data.slice(1)
            : prevData.datasets[0].data;

        return {
          ...prevData,
          labels: [...newLabels, newTime],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...newData, newDataPoint],
            },
          ],
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedMetric]);

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          animation: {
            duration: 0, // Disable animation for Y-axis to prevent jumping
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10, // Limit the number of X-axis ticks shown
              },
            },
            y: {
              title: {
                display: true,
                text: `${selectedMetric} Value`,
              },
              beginAtZero: true, // Start Y-axis at 0 to prevent jumping
            },
          },
          plugins: {
            legend: {
              display: false, // Hide the legend for a cleaner look
            },
          },
          elements: {
            line: {
              tension: 0.4, // Add smooth curves
            },
            point: {
              radius: 2, // Set point size to make graph cleaner
            },
          },
        }}
      />
    </div>
  );
};

export default GraphComponent;
