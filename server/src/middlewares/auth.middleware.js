import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const authMiddleware = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
        // console.log(token);

        if(!token) {
            throw new ApiError(401, "Unauthorized Request")
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeToken._id).select("-password -refreshToken")
        
        if(!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        if (user.isAccountDeactivated) {
            const now = new Date();
            const expiry = user.accountDeactivatedExpiry;

            // Still within deactivation period
            if (user.isAccountDeactivated && expiry > now) {
                throw new ApiError(403, "Account is currently deactivated");
            }

            // If deactivation period has passed, auto-reactivate
            user.isAccountDeactivated = false;
            user.accountDeactivatedExpiry = null;
            await user.save({ validateBeforeSave: false });
        }
        
        req.user=user
        next()
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})