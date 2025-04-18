import mongoose,{ Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema(
    {
        name : {
            type : String,
            required : [true, "Name is required"],
            trim : true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        avatar : {
            public_id : {
                type : String,
                required : [true, "Avatar Public Id is required"]
            },
            secure_url : {
                type : String,
                required : [true, "Avatar secure_url is required"]
            }
        },

        password: {
            type: String,
            required: [true, 'password is required']
        },
        bio : {
            type : String,
            required : [true, "Bio is required"],
        },
        isAccountDeactivated : {
            type : Boolean,
            default : false,
            enum : [true, false]
        },
        accountDeactivatedExpiry : {
            type : Date,
        },
        allCollabs : [
            {
                type : Schema.Types.ObjectId,
                ref : "Collab"
            }
        ],
        refreshToken: {
            type: String
        },
        forgotPasswordToken : {
            type : String,
            select : false,
        },
        forgotPasswordExpiry : {
            type : Date,
            select : false
        }
    },
        
    {
        timestamps: true
    }

)

userSchema.pre("save", async function (next)  {
    if(!this.isModified("password")) return next()

    this.password= await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods = {
    isPasswordCorrect  : async function (password)  {
        return await bcrypt.compare(password,this.password)    
    },
    generateAccessToken : function () {
        return jwt.sign(
            {
                _id:this._id,
                username: this.username,
                email:this.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    },
    generateRefreshToken : function () {
        return jwt.sign(
            {
                _id:this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    },

    generatePasswordResetToken : async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.forgotPasswordtoken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
        return resetToken;

    }
}


export const User= mongoose.model("User", userSchema)