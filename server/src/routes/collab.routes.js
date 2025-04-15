import { Router } from "express";
import { allCollabs,
         createCollab,
         stopCollab,
         startCollab,
         deleteCollab
    } from "../controllers/collab.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/stop-collab/:roomId").post(stopCollab)
router.route("/playground/:roomId").post(startCollab)


router.use(authMiddleware)

router.route("/create").post(createCollab)
router.route("/all-collabs").get(allCollabs)
router.route("/delete-collab/:roomId").delete(deleteCollab)

export default router;