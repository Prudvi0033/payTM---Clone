import express from "express"
import { protectRoute } from "../lib/middleware.js"
import {profile, editProfile, getConnections } from "../routes/user.route.js"


const router = express.Router()

router.get("/profile",protectRoute, profile)
router.put("/editProfile",protectRoute, editProfile)
router.get("/search", getConnections)

export default router