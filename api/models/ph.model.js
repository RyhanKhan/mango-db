import mongoose from "mongoose";

const phSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const ph = mongoose.model("ph", phSchema);

export default ph;
