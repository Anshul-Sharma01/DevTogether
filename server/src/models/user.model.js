import mongoose,{ Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        // avatar: {
        //     public_id:{
        //         type: String,
        //         required: true
        //     },
        //     secure_url:{
        //         type: String,
        //         required: true
        //     }
        // },
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
        password: {
            type: String,
            required: [true, 'password is required']
        },

        allCollabs : [
            {
                type : Schema.Types.ObjectId,
                ref : "Collab"
            }
        ],

        refreshToken: {
            type: String
        }
    },
        
    {
        timestamps: true
    }

)

userSchema.pre("save", async function (next)  {
    if(!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.method.isPasswordCorrect = async function (password)  {
    return await bcrypt.compare(password,this.password)    
}

userSchema.method.generateAccessToken = function () {
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
}

userSchema.method.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User= mongoose.model("User", userSchema)