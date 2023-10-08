import registerController from "../../controllers/auth/register.controller.js";
import express from "express";
import LoginController from "../../controllers/auth/signin.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", LoginController);

export default router;
