import express from "express"
import { login, logout, signin } from "../routes/auth.route.js"

const router = express.Router()

router.post("/signin",signin)
router.post("/login",login)
router.post("/logout",logout)

export default router