import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    credentials : true
}))


app.use(morgan("dev"));
app.use(express.json({ limit : "10mb" }));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(express.static("public"));


// routes imports
import healthRoutes from "./routes/serverCheck.routes.js";



app.use("/api/v1/server-health", healthRoutes);


export { app };
