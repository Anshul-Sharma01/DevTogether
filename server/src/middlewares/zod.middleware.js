import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';

const userSchema = z.object({
    username: z.string().min(3).max(12),
    email: z.string().email(),
    password: z.string().min(8).max(12)
})

const validationUser = (req,_,next) => {
    try {
        const validateResult= userSchema.safeParse(req.body)
        //console.log(validateResult.error)
        if(!validateResult.success) throw new ApiError(400, "Invalid details")
        next();
    } catch (error) {
        throw new ApiError(400, "Invalid details")
    }
   
}

export { validationUser }