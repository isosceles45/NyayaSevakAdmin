import mongoose from "mongoose";

const AdvocateSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    specialization: {
      type: [String],
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 4,
    },
    pass_certificate: {
      type: String,
      required: false,
      default: "https://live.staticflickr.com/1402/1287047691_d50f413782_z.jpg",
    },
    enrollment_number: {
      type: String,
      required: true,
    },
    bar_certificate: {
      type: String,
      required: false,
      default: "https://pbs.twimg.com/media/FMXX-M0aAAUl24k.jpg",
    },
    profileLikes: {
      type: Number,
      required: false,
      default: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    courtPractice: {
      type: [String],
      enum: ["Supreme Court", "High Court", "District Court", "All"],
      required: true,
    },
    serviceType: {
      type: [String],
      enum: ["lawyer", "notery", "accountant", "other"],
      required: true,
    },
    reviews: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "review",
        },
      ],
      required: false,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment",
      },
    ],
    address: {
      type: String,
      required: true,
    },
    iframe: {
      type: String,
      required: false,
      default:
        "<iframe className='w-full h-48 mt-4' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.526395712!2d76.7635682585092!3d28.643684611561188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1694610332827!5m2!1sen!2sin' style={{ border: 0 }} loading='lazy'></iframe>",
    },
  },
  { timestamps: true }
);

const advocateModel = mongoose.model("advocate", AdvocateSchema);
export default advocateModel;
