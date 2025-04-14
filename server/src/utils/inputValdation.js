import { z } from "zod";
import { ApiError } from "./ApiError.js";

const usernameSchema = z.string()
    .min(3, "Username must be at least 3 characters long") 
    .max(12, "Username cannot be more than 12 characters long");

const emailSchema = z.string()
    .email("Invalid email format");

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .max(16, "Password must not exceed 12 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (@, $, !, %, *, ?, &)"
  );

  const usernameCheck = (username) => {
    try {
      const validateResult = usernameSchema.safeParse(username);
      
      if(!validateResult.success){
        throw new ApiError(400,validateResult.error.issues[0].message)
      }
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid username")
    }
  }

  const emailCheck = (email) => {
    try {
      const validateResult = emailSchema.safeParse(email);
      if(!validateResult.success){
        throw new ApiError(400,validateResult.error.issues[0].message)
      }
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid email")
    }
  }

    const passwordCheck = (password) => {
        try {
          const validateResult = passwordSchema.safeParse(password);
          
          if(!validateResult.success){
              const errorMessages = validateResult.error.issues.map(issue => issue.message);
              // console.log("here at");
              console.log(errorMessages[0]);
              // console.log("here at");
              
              throw new ApiError(400, errorMessages[0]);
          }
        } catch (error) {
            throw new ApiError(400, error?.message || "Invalid password")
        }
    }

    export { usernameCheck, emailCheck, passwordCheck }
