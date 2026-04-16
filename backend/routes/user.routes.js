import { Router } from "express";
import {
  loginUser,
  registerUser,
  userLogout,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
{verifyJWT}

const router = Router();

// route for userregister
router.route("/register").post(registerUser);

// route for userlogin
router.route("/login").post(loginUser);

// route for userlogout
router.route("/logout").post(verifyJWT,userLogout);

// route for adminlogin
router.route("/login");

export default router;
