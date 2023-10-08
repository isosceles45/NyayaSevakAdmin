import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    advocate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "advocate",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointment", AppointmentSchema);
export default appointmentModel;
