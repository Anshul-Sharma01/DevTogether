
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path : "./.env" });


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided");
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder : "DevTogether"
        });

        // Only delete local file if upload was successful
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); 
            console.log(`File ${localFilePath} successfully deleted..`);
        }

        return cloudinaryResponse;

    } catch (err) {
        // Delete the file in case of any error (upload or otherwise)
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            // console.log(`File ${localFilePath} successfully deleted after error..`);
        }

        console.error(`Cloudinary Upload Error: ${err.message}`);
        throw new Error("Failed to upload file to Cloudinary");
    }
};

const deleteMultipleFromCloudinary = async (publicIds) => {
    try {
        await cloudinary.api.delete_resources(publicIds);
    } catch (error) {
        console.error("Cloudinary batch delete error:", error);
        throw new Error("Failed to delete images from Cloudinary");
    }
};

const deleteFromCloudinary = async(public_id) => {
    try{
        const response = await cloudinary.uploader.destroy(
            public_id, {
                invalidate : true, resource_type : "image"
            }
        );
        // console.log("Cloudinary Delete Response:", response);
        return response;
    }catch(err){
        console.log(`Error occurred while deleting file from cloduinary : ${err}`);
        return null;
    }
}



export { 
    uploadOnCloudinary,
    deleteMultipleFromCloudinary,
    deleteFromCloudinary
}



