import { Collab } from "../models/collab.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { deleteContainer,
         setup, 
         startContainer, 
         stopContainer 
       } from "../utils/containerHandler.js";


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
      backendPort: backend.hostPort,
      frontendContainerId: frontend.containerId,
      backendContainerId: backend.containerId
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

    const allCollab = await Promise.all(Object.values(collabs).map(async (value) => {
      return await Collab.findById(value).select("-createdBy")
    })
)
    // console.log(allCollab);
    
    if(!allCollab) {
      throw new ApiError(400, "Error in AllCollabs")
    }


    return res
    .status(200)
    .json(
      new ApiResponse(200, allCollab, "Succesfully shown AllCollabs")
    )
      
})

const stopCollab = asyncHandler(async (req,res) => {
    const { roomId } = req.params

    if(!roomId) {
      throw new ApiError(400, "Missing room ID") 
    }

    const collab = await Collab.findOne({ roomId })

    if(!collab) {
      throw new ApiError(404, "Collab not found")
    }

    await stopContainer(collab.frontendContainerId)
    await stopContainer(collab.backendContainerId)

    return res
    .status(200)
    .json(
      new ApiResponse(200, null, "Collab successfully stopped")
    )
})

const startCollab = asyncHandler(async (req,res) => {
   const { roomId } = req.params;

   if(!roomId) {
    throw new ApiError(400, "Missing room ID")
   }

   const collab = await Collab.findOne({ roomId })

   if(!collab) {
    throw new ApiError(404, "Collab not found")
   }

   await startContainer(collab.frontendContainerId)
   await startContainer(collab.backendContainerId)

   return res
   .status(200)
   .json(
    new ApiResponse(200, collab, "Collab successfully started")
   )
})

const deleteCollab = asyncHandler(async (req,res) => {
   const { roomId } = req.params

   if(!roomId) {
    throw new ApiError(400, "Missing room ID")
   }

    const collab = await Collab.findOne({ roomId })

    await deleteContainer(collab.frontendContainerId)
    await deleteContainer(collab.backendContainerId)

    await Collab.findByIdAndDelete(collab._id)

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { allCollabs: collab._id } },
      { new: true }
    )

    return res
    .status(200)
    .json(
      new ApiResponse(200, null, "Collab successfully deleted")
    )
})


export {
     createCollab,
     allCollabs,
     stopCollab,
     startCollab,
     deleteCollab
};
