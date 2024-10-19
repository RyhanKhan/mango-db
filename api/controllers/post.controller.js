import humidity from "../models/humidity.model.js";
import ph from "../models/ph.model.js";
import nitrogenContent from "../models/nitrogenContent.model.js";
import soilMoisture from "../models/soilMoisture.model.js";
import temperature from "../models/temperature.model.js";
import precipitation from "../models/precipitation.model.js";

export const postpH = async (req, res) => {
  const { value, timestamp } = req.body;
  if (!value || value === "" || !timestamp || timestamp === "") {
    return res.status(400).json({ message: "ph is required" });
  }
  const newph = new ph({
    value,
    timestamp,
  });
  try {
    await newph.save();
    res.json("ph post successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postHumidity = async (req, res) => {
  const { value, timestamp } = req.body;
  if (!value || value === "" || !timestamp || timestamp === "") {
    return res.status(400).json({ message: "humidity is required" });
  }
  const newHumidity = new humidity({
    value,
    timestamp,
  });
  try {
    await newHumidity.save();
    res.json("humidity post successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postNitrogenContent = async (req, res) => {
  const { value, timestamp } = req.body;
  if (!value || value === "" || !timestamp || timestamp === "") {
    return res.status(400).json({ message: "nitrogenContent is required" });
  }
  const newNitrogenContent = new nitrogenContent({
    value,
    timestamp,
  });
  try {
    await newNitrogenContent.save();
    res.json("NitrogenContent post successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postSoilMoisture = async (req, res) => {
  const { value, timestamp } = req.body;
  if (!value || value === "" || !timestamp || timestamp === "") {
    return res.status(400).json({ message: "soilMoisture is required" });
  }
  const newSoilMoisture = new soilMoisture({
    value,
    timestamp,
  });
  try {
    await newSoilMoisture.save();
    res.json("soilMoisture post successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postTemperature = async (req, res) => {
  const { value, timestamp } = req.body;
  if (!value || value === "" || !timestamp || timestamp === "") {
    return res.status(400).json({ message: "Temperature is required" });
  }
  const newTemperature = new temperature({
    value,
    timestamp,
  });
  try {
    await newTemperature.save();
    res.json("Temperature post successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postPrecipitation = async (req, res) => {
  const { value, timestamp } = req.body;
  if (!value || value === "" || !timestamp || timestamp === "") {
    return res.status(400).json({ message: "Precipitation is required" });
  }
  const newPrecipitation = new precipitation({
    value,
    timestamp,
  });
  try {
    await newPrecipitation.save();
    res.json("Precipitation post successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
