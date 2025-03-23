import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenAndRefreshToken = async (user) =>{
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave : false })

    return { accessToken, refreshToken }
}

const registerController = asyncHandler(async (req,res) => {
    const { username, email, password } = req.body;

    //console.log(username);
    
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

const loginController = asyncHandler(async (req,res) => {
    const { username, email, password } = req.body;

    const checkUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(!checkUser) {
        throw new ApiError(400, "User or Email not found")
    }

    const isPasswordValid = await checkUser.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(checkUser)

    const options = {
        httpOnly: true,
        secure: true
    }

    const loginUser  = await User.findById(checkUser._id).select(
        "-password -refreshToken"
    )
    
    if(!loginUser){
        throw new ApiError(500, "Something went wrong while logging in")
    }

    return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,loginUser,"User Logged in successfully")
    )
})

export {registerController, loginController}