import { Router } from "express";
import { allCollabs,
         createCollab,
         stopCollab,
       } from "../controllers/collab.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/stop-collab/:roomId").post(stopCollab)

router.use(authMiddleware)

router.route("/create").post(createCollab)
router.route("/all-collabs").get(allCollabs)

export default router;