import { Collab } from "../models/collab.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { deleteContainer,
          setup, 
          startContainer,  
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

    const {frontendName,
           backendName,
           userName,
           frontendId,
           backendId,
           userId,
           userbackendName,
           userfrontendName,
           userbackendId,
           userfrontendId
          } = await setup(language, roomId);

    console.log("Frontend Name: ", frontendName);
    console.log("Backend Name: ", backendName);
    console.log("Frontend Container ID: ", frontendId);
    console.log("Backend Container ID: ", backendId);
    console.log("User Container",userId)
    console.log("User Container Name: ", userName)
    console.log("User Frontend Container ID: ", userfrontendId);
    console.log("User Backend Container ID: ", userbackendId);

    if(!frontendId || !backendId) {
      throw new ApiError(400, "Container not formed")
    }
    
    const newCollab = await Collab.create({
      title,
      roomId,
      language,
      description: description || "",
      createdBy: req.user._id,
      frontendContainerName: frontendName,
      backendContainerName: backendName,
      frontendContainerId: frontendId,
      backendContainerId: backendId,
      userContainerName: userName,
      userContainerId: userId,
      userFrontendContainerId: userfrontendId,
      userFrontendContainerName: userfrontendName,
      userBackendContainerId: userbackendId,
      userBackendContainerName: userbackendName,
    });

    if(!newCollab) {
      throw new ApiError(400, "Collab not created")
    }
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

// const stopCollab = asyncHandler(async (req,res) => {

//     console.log("Collab stop requested from fronted !!");
//     const { roomId } = req.params;
//     console.log("Room Id : ", roomId);

//     if(!roomId) {
//       throw new ApiError(400, "Missing room ID") 
//     }

//     const collab = await Collab.findOne({ roomId })

//     if(!collab) {
//       throw new ApiError(404, "Collab not found")
//     }

//     await stopContainer(collab.frontendContainerId)
//     await stopContainer(collab.backendContainerId)

//     return res
//     .status(200)
//     .json(
//       new ApiResponse(200, null, "Collab successfully stopped")
//     )
// })

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
   await startContainer(collab?.userContainerId)
   await startContainer(collab?.userFrontendContainerId)
   await startContainer(collab?.userBackendContainerId)


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
    await deleteContainer(collab?.userContainerId)
    await deleteContainer(collab?.userFrontendContainerId)
    await deleteContainer(collab?.userBackendContainerId)

    await Collab.findByIdAndDelete(collab._id)

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { allCollabs: collab._id } },
      { new: true }
    )


    return res
    .status(200)
    .json(
      new ApiResponse(200, collab, "Collab successfully deleted")
    )
})


export {
     createCollab,
     allCollabs,
     startCollab,
     deleteCollab
};
