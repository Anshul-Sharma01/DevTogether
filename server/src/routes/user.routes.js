import { Router } from "express";
import { registerController } from "../controllers/user.controller.js";

const router = Router();

router.route("/check").post(registerController);

export default router;