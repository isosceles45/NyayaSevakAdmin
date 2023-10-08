import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    lawyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "advocate",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("review", reviewSchema);
export default reviewModel;
