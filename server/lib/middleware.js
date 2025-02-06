import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies["jwt-paytm"]
        if (!token) {
            return res.status(401).json({
                msg: "No token"
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                msg: "Invalid Token"
            })
        }

        const user = await User.findById(decoded.id).select("-password")

        if(!user){
            return res.json("User not found")
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protect route");
    }
}