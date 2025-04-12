import { Collab } from "../models/collab.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const createCollab = asyncHandler(async (req, res) => {

    const { title, collabId, language, description } = req.body;

    if (!title || !collabId || !language) {
       throw new ApiError(500, "Something went wrong while making collab in")
    }

    const existingCollab = await Collab.findOne({ collabId });
    if (existingCollab) {
        throw new ApiError(500, "Collab already existing")
    }

    const newCollab = await Collab.create({
      title,
      collabId,
      language,
      description: description || "",
      createdBy: req.user._id,
    });

    await User.findByIdAndUpdate(
        req.user._id,
        { $push: { allCollabs: newCollab._id } },
        { new: true }
    )

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
