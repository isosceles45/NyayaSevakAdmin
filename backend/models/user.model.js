import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  serviceLookingFor: {
    type: String,
  },
  clientOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "advocate",
  },
  isServiceProvider: {
    type: Boolean,
    ref: "advocate",
    default: false,
  },
  appointment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
    },
  ],
});

const userModel = mongoose.model("user", UserSchema);
export default userModel;
