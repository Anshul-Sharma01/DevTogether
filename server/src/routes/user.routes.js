import { Router } from "express";
import { registerController, loginController, refreshAccessTokenController } from "../controllers/user.controller.js";
import { validationUser } from "../middlewares/zod.middleware.js";

const router = Router();

router.route("/register").post( validationUser, registerController)
router.route("/login").post( loginController)
router.route("/refresh-token").post(refreshAccessTokenController)


export default router;