import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router()

// route for userregister
router.route("/register").post(registerUser)

// route for userlogin
router.route("/login").post(loginUser)

// route for adminlogin
router.route("/login")

export default router