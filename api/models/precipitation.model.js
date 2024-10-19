import mongoose from "mongoose";

const precipitationSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const precipitation = mongoose.model("precipitation", precipitationSchema);

export default precipitation;
