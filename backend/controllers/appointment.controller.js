import Appointment from "../models/appointment.model.js";
import UserModel from "../models/user.model.js";
import AdvocateModel from "../models/lawyers.model.js";
import { ObjectId } from "mongoose";

export const createAppointment = async (req, res) => {
  const { user, advocate, date, time, reason, description } = req.body;
  const newAppointment = new Appointment({
    user,
    advocate,
    date,
    time,
    reason,
    description,
  });
  const userFound = await UserModel.findById(user);
  try {
    await newAppointment.save();
    const prevAppointments = userFound?.appointment || [];
    await userFound.updateOne({
      appointment: [...prevAppointments, newAppointment._id],
    });
    const adv = await AdvocateModel.findById(advocate);
    console.log("adv", adv);
    const prevAdvAppointments = adv?.appointments || [];
    await adv.updateOne({
      appointments: [...prevAdvAppointments, newAppointment._id],
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  const { id } = req.params;

  try {
    const LawyerId = await AdvocateModel.findOne({ id: id });
    console.log("LawyerId", LawyerId);
    const appointments = await Appointment.find({
      advocate: LawyerId._id.toString(),
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
