import mongoose from "mongoose";

const nitrogenContentSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const nitrogenContent = mongoose.model(
  "nitrogenContent",
  nitrogenContentSchema
);

export default nitrogenContent;
