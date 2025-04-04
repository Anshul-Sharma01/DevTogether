import { Router } from "express";
import { 
        registerController, 
        loginController, 
        refreshAccessTokenController, 
        updateProfileController,
        changePasswordController, 
        fetchProfileController,
        logoutController,
        deleteAccountController,
        updateProfilePictureController,
        updateUserNameController
        } from "../controllers/user.controller.js";
        
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register")
.post( upload.single("avatar"), registerController)

router.route("/login").post(loginController)
router.route("/refresh-token").post(refreshAccessTokenController)

router.use(authMiddleware);

router.route("/update-username").patch(updateUserNameController);
router.route("/update-profile").patch( updateProfileController)
router.route("/update-picture")
.post(upload.single("avatar"), updateProfilePictureController);
router.route('/change-password').patch( changePasswordController)
router.route("/me").get( fetchProfileController)
router.route("/logout").get( logoutController)
router.route("/delete-account").delete( deleteAccountController)

export default router;