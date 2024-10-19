import mongoose from "mongoose";

const temperatureSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const temperature = mongoose.model("temperature", temperatureSchema);

export default temperature;
