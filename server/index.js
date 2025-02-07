import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import connectDB from "./lib/db.js";

import authRoutes from "./controller/auth.controller.js"
import userRoutes from "./controller/user.controller.js"
import accountRoutes from "./controller/account.controller.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/account",accountRoutes)

app.listen(8000, () => {
    console.log("Server is Running");
    connectDB();
})