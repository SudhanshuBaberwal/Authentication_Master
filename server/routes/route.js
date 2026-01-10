import express from "express"
import {signup, logout , login, forgotPassword, resetPassword, verifyEmail, checkAuth} from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const route = express.Router()

route.post("/signup" , signup)
route.post("/login" , login)
route.post("/forgot-password" , forgotPassword)
route.post("/reset-password/:token" , resetPassword)
route.post("/verify-email" , verifyEmail)
route.get("/check-auth" , verifyToken, checkAuth)

route.post("/logout" , logout)
export default route;