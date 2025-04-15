import { Router } from "express";
import { createCollab } from "../controllers/collab.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/create").post( authMiddleware,createCollab)

export default router;