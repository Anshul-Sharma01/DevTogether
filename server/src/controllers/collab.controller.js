import { Collab } from "../models/collab.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCollab = asyncHandler(async (req, res) => {

    const { title, roomId, language, description } = req.body;

    if (!title || !roomId || !language) {
       throw new ApiError(500, "Something went wrong while making collab in")
    }

    const existingCollab = await Collab.findOne({ roomId });
    if (existingCollab) {
        throw new ApiError(500, "Collab already existing")
    }

    const newCollab = await Collab.create({
      title,
      roomId,
      language,
      description: description || "",
      createdBy: req.user._id,
    });


    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    newCollab,
                    "collab sucessfully made"
                )
            )
    
})

export {
     createCollab 
};
