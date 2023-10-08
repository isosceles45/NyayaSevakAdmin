import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
const registerController = async (req, res) => {
  console.log("register controller");
  const { fname, lname, phoneNumber, email, gender, serviceLookingFor } =
    req.body;
  try {
    const hashedPhone = bcrypt.hashSync(phoneNumber, bcryptSalt);
    const createdUser = await User.create({
      fname,
      lname,
      phoneNumber: hashedPhone,
      email,
      gender,
      serviceLookingFor,
    });
    const token = jwt.sign(
      {
        userId: createdUser._id,
        fname,
        isServiceProvider: createdUser.isServiceProvider,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token, {
        sameSite: "none",
        secure: true,
      })
      .status(201)
      .json(createdUser);
  } catch (err) {
    res.status(400).json(err);
  }
};
export default registerController;
