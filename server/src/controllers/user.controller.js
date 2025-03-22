import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";


const registerController = asyncHandler(async (req,res) => {
    const { username, email, password } = req.body;
    // will apply zod for input validation

    console.log(username);
    
    const existUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(existUser){
        throw new ApiError(400,"Email or Username already exist")
    }

    // will check for avatar and upload in cloudinary

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export {registerController}