import mongoose from "mongoose";
const phSchema = new mongoose.Schema(
  {
    value: {
      type: float,
      required: true,
    },
  },
  { timestamps: true }
);
const ph = mongoose.model("ph", phSchema);
export default ph;
