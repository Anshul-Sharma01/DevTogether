import { Router } from "express";
import { registerController, loginController } from "../controllers/user.controller.js";
import { validationUser } from "../middlewares/zod.middleware.js";

const router = Router();

router.route("/register").post( validationUser, registerController)
router.route("/login").post( loginController)


export default router;