import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import connectDB from "./lib/db.js";

import authRoutes from "./controller/auth.controller.js"
import userRoutes from "./controller/user.controller.js"

dotenv.config()

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user",userRoutes)

app.listen(8000, () => {
    console.log("Server is Running");
    connectDB();
})