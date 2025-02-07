import express from 'express'
import protectRoute from "../lib/middleware.js"
import { balance, transfer } from '../routes/account.route.js'

const router = express.Router()

router.get("/balance",protectRoute, balance)
router.put("/transfer",protectRoute, transfer)

export default router