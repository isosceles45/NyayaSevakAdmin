import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connect;
