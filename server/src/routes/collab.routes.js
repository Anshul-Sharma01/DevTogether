import { Router } from "express";
import { allCollabs, createCollab } from "../controllers/collab.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware)
router.route("/create").post(createCollab)
router.route("/all-collabs").get(allCollabs)

export default router;