let intervalId;
let updateInterval = 5000; // Default update interval in milliseconds
let countdownId;

document.getElementById("intervalSlider").addEventListener("input", function () {
  updateInterval = this.value * 1000; // Convert seconds to milliseconds
  document.getElementById("intervalValue").innerText = this.value;
  document.getElementById("timerDisplay").innerText = updateInterval; // Update timer display
});

document.getElementById("startBtn").addEventListener("click", function () {
  if (!intervalId) {
    intervalId = setInterval(sendData, updateInterval);
    startCountdown(updateInterval); // Start the countdown timer
  }
});

document.getElementById("stopBtn").addEventListener("click", function () {
  clearInterval(intervalId);
  intervalId = null;
  clearInterval(countdownId); // Stop the countdown
});

function sendData() {
  const data = {
    crop: document.getElementById("crop").value,
    soil_pH: document.getElementById("soil_pH").value,
    moisture_content: document.getElementById("moisture_content").value,
    nitrogen_content: document.getElementById("nitrogen_content").value,
    temperature: document.getElementById("temperature").value,
    precipitation: document.getElementById("precipitation").value,
    humidity: document.getElementById("humidity").value,
  };

  fetch("http://127.0.0.1:5000/metrics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log("Data sent successfully:", data))
    .catch((error) => console.error("Error sending data:", error));

  startCountdown(updateInterval); // Reset the countdown after each data send
}

function startCountdown(duration) {
  let timeRemaining = duration;

  // Clear any previous countdown interval
  clearInterval(countdownId);

  countdownId = setInterval(function () {
    if (timeRemaining <= 0) {
      clearInterval(countdownId);
    } else {
      timeRemaining -= 100; // Decrease by 100 ms
      document.getElementById("timerDisplay").innerText = timeRemaining;
    }
  }, 100); // Update the countdown every 100 ms
}
