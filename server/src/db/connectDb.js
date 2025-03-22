import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
       // console.log("MongoDB connected", connectionInstance);
    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit();       
    }
    
}

export default connectDB;
