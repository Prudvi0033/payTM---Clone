import express from "express"
import { login, logout, signin } from "../routes/auth.route.js"
import { protectRoute } from "../lib/middleware.js"

const router = express.Router()

router.post("/signin",signin)
router.post("/login",protectRoute,login)
router.post("/logout",logout)

export default router