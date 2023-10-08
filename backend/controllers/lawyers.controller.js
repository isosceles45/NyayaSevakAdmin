import advocateModel from "../models/lawyers.model.js";
import userModel from "../models/user.model.js";


export const getAllLawyers = async (req, res) => {
  const lawyers = await advocateModel.find({});
  res.json(lawyers);
};

export const getLawyerByCity = async (req, res) => {
  console.log(req.params.id);
  const lawyer = await advocateModel.find({ city: req.params.id });
  res.json(lawyer);
};

export const getLawyerById = async (req, res) => {
  const { ids } = req.body;
  try {
    const lawyer = await userModel.find({ _id: { $in: ids } });
    res.json(lawyer);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllLawyersInfo = async (req, res) => {
  const { id } = req.params;
  const lawyers = await advocateModel.find({
    id: id,
  });
  console.log(lawyers);
  res.json(lawyers);
};

export const ApplayLawyer = async (req, res) => {
  console.log("hello 1");
  const {
    serviceType,
    specialization,
    state,
    city,
    id,
    name,
    phoneNo,
    email,
    desc,
    image,
    experience,
    gender,
    courtPractice,
    address,
    pass_certificate,
    bar_certificate,
    enrollment_number,
  } = req.body;
  const userInfo = await userModel.findById(id);
  console.log("hello 2");
  if (!userInfo) {
    return res.status(400).json("User not found");
  }
  const isAlreadyApplied = await advocateModel.findOne({ id });
  if (isAlreadyApplied) {
    return res.status(400).json("User is already applied");
  }
  if (userInfo.isServiceProvider) {
    return res.status(400).json("User is already a service provider");
  }

  const serviceProvider = new advocateModel({
    id,
    name,
    phoneNo,
    email,
    city,
    state,
    desc,
    image,
    experience,
    gender,
    courtPractice,
    serviceType,
    specialization,
    address,
    pass_certificate,
    bar_certificate,
    enrollment_number,
  });
  console.log(req.body);
  await serviceProvider.save();
  await userInfo.save();
  return res.status(200).json(serviceProvider);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getApproval = async (req, res) => {
  const { id } = req.params;
  try {
    // Update the lawyer status in your database
    const updatedApplier = await userModel.findByIdAndUpdate(id, {
      isServiceProvider: true,
    });

    res.json(updatedApplier);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getRejection = async (req, res) => {
  const { id } = req.params;
  try {
    // Update the lawyer status in your database
    const updatedApplier = await userModel.findByIdAndUpdate(id, {
      isServiceProvider: false,
    });

    res.json(updatedApplier);
  } catch (err) {
    res.status(400).json(err);
  }
};

