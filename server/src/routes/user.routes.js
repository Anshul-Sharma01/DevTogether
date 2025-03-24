import { Router } from "express";
import { registerController, 
    loginController, 
    refreshAccessTokenController, 
    updateProfileController,
    changePasswordController } from "../controllers/user.controller.js";
import { validationUser } from "../middlewares/zod.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post( validationUser, registerController)
router.route("/login").post( loginController)
router.route("/refresh-token").post(refreshAccessTokenController)
router.route("/update-profile").patch(authMiddleware, updateProfileController)
router.route('/change-password').patch(authMiddleware, changePasswordController)

export default router;