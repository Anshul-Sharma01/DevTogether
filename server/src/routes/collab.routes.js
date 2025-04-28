import { Router } from "express";
import { allCollabs,
        createCollab,
        startCollab,
        deleteCollab
    } from "../controllers/collab.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Collab } from "../models/collab.model.js";

const router = Router();

router.route("/playground/:roomId").post(startCollab)

router.route("/user-url").get(async(req,res) => {
    const { clientRoomId } = req.query;

    const collab = await Collab.findOne({roomId:clientRoomId})

    let name = collab?.userContainerName;
    res.json({
        name
    })

})



router.use(authMiddleware)

router.route("/create").post(createCollab)
router.route("/all-collabs").get(allCollabs)
router.route("/delete-collab/:roomId").delete(deleteCollab)

export default router;