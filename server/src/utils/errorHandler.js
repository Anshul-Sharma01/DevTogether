import { ApiError } from "./ApiError.js" // adjust path if needed

const errorHandler = (err, req, res, next) => {
    // If the error is an instance of your custom ApiError class
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
            data: null,
        });
    }

    // For unhandled/unknown errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        data: null,
    });
};

export { errorHandler };
