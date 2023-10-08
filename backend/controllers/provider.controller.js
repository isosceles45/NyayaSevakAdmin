// import serviceProviderModel from "../models/provider.model.js";
// import userModel from "../models/user.model.js";

// export const Applay = async (req, res) => {
//   const { serviceType, specialization } = req.body;
//   const userId = req.params.userId;
//   const userInfo = await userModel.findById(userId);
//   if (!userInfo) {
//     return res.status(400).json("User not found");
//   }
//   userInfo.set({ isServiceProvider: true });
//   const serviceProvider = new serviceProviderModel({
//     userInfo: userInfo._id,
//     serviceType,
//     specialization,
//   });

//   await serviceProvider.save();
//   await userInfo.save();
//   return res.status(200).json(serviceProvider);
// };
