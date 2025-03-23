import { Router } from "express";
import { registerController } from "../controllers/user.controller.js";
import { validationUser } from "../middlewares/zod.middleware.js";

const router = Router();

router.route("/register").post( validationUser, registerController);

export default router;