import mongoose from "mongoose";

const humiditySchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const humidity = mongoose.model("humidity", humiditySchema);

export default humidity;
