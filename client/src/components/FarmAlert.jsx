import React, { useState, useEffect } from "react";

const FarmAlert = () => {
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Fetch alerts from backend (simulating with a local API)
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/alerts"); // Assuming you have an endpoint for alerts
        const data = await response.json();
        setAlertMessage(data.alertMessage); // Setting the alert message from the response
      } catch (error) {
        console.error("Error fetching alert data:", error);
        setAlertMessage("Unable to fetch alerts. Please check the system.");
      }
    };

    fetchAlerts();
  }, []); // Run only once on mount

  return (
    <div className="bg-red-100 p-4 rounded-md shadow-md mt-4 mb-4">
      <h3 className="text-lg font-semibold text-red-800">Farm Alert:</h3>
      <p className="text-red-700">{alertMessage}</p>
    </div>
  );
};

export default FarmAlert;
