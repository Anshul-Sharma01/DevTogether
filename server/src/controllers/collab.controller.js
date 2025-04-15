import { Collab } from "../models/collab.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { setup } from "../utils/createContainer.js";

const createCollab = asyncHandler(async (req, res) => {
    const { title, roomId, language, description } = req.body;

    if (!title || !roomId || !language) {
       throw new ApiError(400, "Missing required fields");
    }

    console.log("Room ID:", roomId);
    console.log("User ID:", req.user?._id);

    const existingCollab = await Collab.findOne({ roomId });
    if (existingCollab) {
        throw new ApiError(409, "Collab with same room ID already exists");
    }

    const {frontend,backend} = await setup();

    if(!frontend || !backend) {
      throw new ApiError(400, "Container not formed")
    }

    const newCollab = await Collab.create({
      title,
      roomId,
      language,
      description: description || "",
      createdBy: req.user._id,
      frontendPort: frontend.hostPort,
      backendPort: backend.hostPort
    });

    await User.findByIdAndUpdate(
        req.user._id,
        { $push: { allCollabs: newCollab._id } },
        { new: true }
    );

    return res
    .status(200)
    .json(
      new ApiResponse(200, newCollab, "Collab successfully made")
    );
});


const allCollabs =  asyncHandler(async (req,res) => {
     const user = await User.findById(req.user._id);

     const  collabs = user.allCollabs;
    //  console.log(collabs);

    if(!collabs) {
      throw new ApiError(400, "Unauthorized Request")
    }

    const allCollab = {}

    

    return res
    .status(200)
    .json(
      new ApiResponse(200)
    )
      
})

export {
     createCollab,
     allCollabs 
};
