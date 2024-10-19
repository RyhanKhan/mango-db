import mongoose from "mongoose";

const soilMoistureSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const soilMoisture = mongoose.model("soilMoisture", soilMoistureSchema);

export default soilMoisture;
