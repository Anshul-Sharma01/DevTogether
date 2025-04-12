import { Collab } from "../models/collab.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const createCollab = async (req, res) => {

    const { title, roomId, language, description } = req.body;

    if (!title || !roomId || !language) {
       throw new ApiError(500, "Something went wrong while making collab in")
    }

    const existingCollab = await Collab.findOne({ roomId });
    if (existingCollab) {
        throw new ApiError(500, "Collab already existing")
    }

    const newCollab = new Collab({
      title,
      roomId,
      language,
      description: description || "",
      createdBy: req.user._id,
    });

    await newCollab.save();

    return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", newRefreshToken, option)
            .json(
                new ApiResponse(
                    200,
                    {accessToken, refreshToken: newRefreshToken},
                    "Access Token Refreshed"
                )
            )
    
};

module.exports = { createCollab };
