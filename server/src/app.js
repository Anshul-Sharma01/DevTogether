import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [/^http:\/\/localhost:\d+$/];
        if (!origin) return callback(null, false);
        if (allowedOrigins.some(regex => regex.test(origin))) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));


app.use(express.json({ limit : "10mb" }));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(express.static("public"));



// routes imports
import userRouter from "./routes/user.routes.js"
import collabRouter from "./routes/collab.routes.js"
import { errorHandler } from "./utils/errorHandler.js";


app.use("/api/v1/user", userRouter)
app.use("/api/v1/collab", collabRouter)

app.use(errorHandler);



export { app };
