import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"
import { usernameCheck , emailCheck , passwordCheck } from "../utils/inputValdation.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const generateAccessTokenAndRefreshToken = async (user) =>{
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave : false })

    return { accessToken, refreshToken }
}

const cookieOptions = {
    httpOnly: true,
    secure: false,
    maxAge : 7 *24 * 60 * 60 * 1000,
}

const registerController = asyncHandler(async (req,res) => {
    console.log("Started");
    const { username, email, name, password, bio } = req.body;

    //console.log(username);
    usernameCheck(username)
    emailCheck(email)
    passwordCheck(password)


    const userNameExists = await User.findOne({ username });
    if(userNameExists){
        throw new ApiError(400, "Username already exists");
    }
    
    const emailExists = await User.findOne({ email });
    if(emailExists){
        throw new ApiError(400, "Email already exists");
    }
    console.log("REq.file : ", req.file);

    if(req.file){
        const filePath = req.file?.path;
        const avatar = await uploadOnCloudinary(filePath);
        if(!avatar){
            throw new ApiError(400, "Avatar not uploaded");
        }

        const user = await User.create({
            username:username.toLowerCase(),
            email,
            name,
            password,
            bio,
            avatar : {
                public_id : avatar?.public_id,
                secure_url : avatar?.secure_url
            }
        })
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        
        if(!createdUser) {
            deleteFromCloudinary(avatar?.public_id);
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(createdUser)

        return res.status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(201,
                createdUser,
                "User registered Successfully"
            )
        )

        
    }else{
        throw new ApiError(400, "Avatar file is required");
    }
})

const loginController = asyncHandler(async (req,res) => {
    const { inputValue, password } = req.body;

    // console.log(username, password);

    const checkUser = await User.findOne({
        $or: [{username : inputValue},{email : inputValue}]
    })

    if(!checkUser) {
        throw new ApiError(400, "User or Email not found")
    }

    const isPasswordValid = await checkUser.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400, "Invalid password")
    }

    if (checkUser.isAccountDeactivated) {
        const now = new Date();
        const expiry = checkUser.accountDeactivatedExpiry;

        if (expiry && expiry > now) {
            throw new ApiError(402, "Account is currently deactivated. Try again after " + expiry.toDateString());
        }

        // Auto-reactivate if deactivation expired
        checkUser.isAccountDeactivated = false;
        checkUser.accountDeactivatedExpiry = null;
        await checkUser.save({ validateBeforeSave: false });
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
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
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
    const { name, bio } = req.body
    const userId = req.user?._id;

    const updationFields = {};
    if(name) updationFields.name = name;
    if(bio) updationFields.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: updationFields
        },
        {
            new: true,
            runValidators: true
        }
    ).select("-password -refreshToken")

    //console.log(user);

    return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile details updated successfully"))
    
})

const updateUserNameController = asyncHandler(async(req, res) => {
    const userId = req.user?._id;
    const { username } = req.body;

    usernameCheck(username)
    
    if(!username) {
        throw new ApiError(400, "Username is required")
    }

    if(username == req.user?.username) {
        throw new ApiError(400, "Username is same as previous")
    }
    const userNameExists = await User.find({ username : username });
    if(userNameExists.length > 0) {
        throw new ApiError(400, "Username already exists")
    }


    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set:  {
            username:username
        }},
        {
            new: true,
        }
    ).select("-password -refreshToken")

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Username updated successfully"
        )
    )
})

const forgotPasswordController = asyncHandler(async(req, res) => {
    const { email } = req.body;

    if(!email){
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if(!user){
        throw new ApiError(400, "Email not registered");
    }

    const resetToken = await user.generatePasswordResetToken();
    await user.save({ validateBeforeSave : false });

    const resetPasswordUrl = `${process.env.FRONTED_URL}/auth/reset/${resetToken}`;

    const subject = "Reset Password Token";
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank" > Reset Your Password </a>.\nIf the above link does not work for some reason, then copy paste this link in new tab ${resetPasswordUrl}.\nIf you have not requested this, kindly Ignore.\nThe Link will be valid for 15 minutes only`;

    try{
        await sendEmail(email, subject, message);
        return res.status(200)
        .json(
            new ApiResponse(
                200,
                {},
                `Reset Token has been sent to ${email} respectively`
            )
        );
    }catch(err){
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        await user.save({ validateBeforeSave : false });

        throw new ApiError(400, err?.message || "Error occurred while sending Reset Token");
    }
    
})

const resetPasswordController = asyncHandler(async(req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry : {$gt : Date.now()}
    });

    if(!user){
        throw new ApiError(400, "Token is invalid or expired, Please try again...");
    }

    user.password = password;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )

})

const changePasswordController = asyncHandler(async (req,res) => {
    const { currentPassword, newPassword} = req.body
    // console.log(req.body);
    
    if(!currentPassword || !newPassword) {
        throw new ApiError(400, "Current Password and New Password is required")
    }
    // console.log("here 1");
    
    
    const user = await User.findById(req.user?._id)
    // console.log("user : ", user);
    // console.log("not here 2");
    const checkPassword = await user.isPasswordCorrect(currentPassword)
    // console.log("checked-password : ", checkPassword);
    
    // console.log("saved 3");
    if(!checkPassword) {
        throw new ApiError(400, "Invalid current password")
    }
    
    // console.log("saved 5");
    passwordCheck(newPassword)
    user.password = newPassword


    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200, {user}, "Password changed successfully"))


})

const updateProfilePictureController = asyncHandler(async(req, res) => {
    const userId = req.user?._id;
    
    if(!req.file){
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404, "user not found");
    }
    // console.log("req : ", req.file);

    const avatar = await uploadOnCloudinary(req.file?.path);
    if(!avatar.secure_url){
        throw new ApiError(400, "Please try again");
    }

    await deleteFromCloudinary(user.avatar.public_id);
    user.avatar.secure_url = avatar?.secure_url;
    user.avatar.public_id = avatar?.public_id;

    await user.save({ validateBeforeSave : false });

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Successfully updated Profile Picture"
        )
    );

})

const fetchProfileController = asyncHandler(async (req,res) => {
    let { userId } = req.query;
     //console.log(userId);
    
    if(!userId) {
        userId=req.user._id;
    }
     //console.log(userId);
    
    const user = await User.findById(userId).select("-password")

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
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User Logged out successfully"))
})

const deleteAccountController = asyncHandler(async (req,res) => {
    try {
        const userExists = await User.findByIdAndDelete(req.user._id)
        if(!userExists){
            throw new ApiError(404, "User not found");
        }

        await deleteFromCloudinary(userExists?.avatar?.public_id)

        console.log("Account deleted successfull");
        
    
        return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User account deleted successfully"))
    } catch (error) {
        console.error(`Error occurred while deleting the account : ${error}`);
        throw new ApiError(400, "Error occurred while deleting the account");
    }
})

const deactivateAccountController = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const expiryDays = 7;
    const deactivationExpiry = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                isAccountDeactivated: true,
                accountDeactivatedExpiry: deactivationExpiry
            }
        },
        {
            new: true
        }
    );

    return res.status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
        new ApiResponse(200, user, "User account deactivated successfully")
    );
});


export {
    registerController, 
    loginController, 
    refreshAccessTokenController, 
    updateProfileController, 
    changePasswordController,
    fetchProfileController,
    logoutController,
    deleteAccountController,
    deactivateAccountController,
    updateProfilePictureController,
    updateUserNameController,
    forgotPasswordController,
    resetPasswordController
}