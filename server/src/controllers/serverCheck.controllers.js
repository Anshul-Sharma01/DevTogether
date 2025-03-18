import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const checkServerHealth = asyncHandler(async(req, res) => {
    try{
        return res.status(200)
        .json(
            new ApiResponse(
                200,
                [],
                "Sever health is ok"
            )
        );
    }catch(err){
        console.error(`Error occurred while checking server health: ${err}`);
        throw new ApiError(400, "Error occurred while checking server health");
    }
})



export {
    checkServerHealth
}
