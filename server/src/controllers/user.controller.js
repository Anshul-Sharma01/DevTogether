import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { usernameCheck , emailCheck , passwordCheck } from "../utils/inputValdation.js";

const generateAccessTokenAndRefreshToken = async (user) =>{
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave : false })

    return { accessToken, refreshToken }
}

const option = {
    httpOnly: true,
    secure: true
}

const registerController = asyncHandler(async (req,res) => {
    const { username, email, password } = req.body;

    //console.log(username);
    usernameCheck(username)
    emailCheck(email)
    passwordCheck(password)
    
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

    const loginUser  = await User.findById(checkUser._id).select(
        "-password -refreshToken"
    )
    
    if(!loginUser){
        throw new ApiError(500, "Something went wrong while logging in")
    }

    return res
    .status(201)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(200,loginUser,"User Logged in successfully")
    )
})

const refreshAccessTokenController = asyncHandler(async (req,res) => {
    const  token = req.cookies.refreshToken || req.body.refreshToken
   // console.log(token)
    if(!token) {
        throw new ApiError(401, "unauthorized request") 
    }

    try {
        const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        //console.log(decodeToken);
         
        const user = await User.findById(decodeToken?._id)
        //console.log(user);
        
        if(!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if(token != user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expires or used")
        }


        const {accessToken, newRefreshToken} = await generateAccessTokenAndRefreshToken(user)

        return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", newRefreshToken, option)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access Token Refreshed"
            )
        )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid  refresh token")
    }
})

const updateProfileController = asyncHandler(async (req,res) => {
    const {username} = req.body
    
    usernameCheck(username)
    if(!username) {
        throw new ApiError(400, "Username is required")
    }

    if(username == req.user?.username) {
        throw new ApiError(400, "Username is same as previous")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set:  {
            username:username
          }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken")

    //console.log(user);

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile details updated successfully"))
    
})

const changePasswordController = asyncHandler(async (req,res) => {
    const { currentPassword, newPassword} = req.body
     //console.log(req.body);
    
    passwordCheck(newPassword)
    if(!currentPassword || !newPassword) {
        throw new ApiError(400, "Current Password and New Password is required")
    }

    const user = await User.findById(req.user?._id)
    const checkPassword = await user.isPasswordCorrect(currentPassword)


    if(!checkPassword) {
        throw new ApiError(400, " Invalid current password")
    }

    user.password = newPassword

    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200, {user}, "Password changed successfully"))


})

const fetchProfileController = asyncHandler(async (req,res) => {
     let { userId } = req.query;
     //console.log(userId);
     
     if(!userId) {
        userId=req.user._id;
     }
     //console.log(userId);
     
     const user= await User.findById(userId).select("-password")

     return res
     .status(200)
     .json( new ApiResponse(200, user, "user fetched succesfully"))

})

const logoutController = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken:1
            }
        },
        {
            new: true
        }

    )

    return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User Logged out successfully"))
})

export {
    registerController, 
    loginController, 
    refreshAccessTokenController, 
    updateProfileController, 
    changePasswordController,
    fetchProfileController,
    logoutController,
       }