import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); // connect to the database
        console.log(`Connected to the database ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit();       
    }
    
}

export default connectDB;
