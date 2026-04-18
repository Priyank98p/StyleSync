import { Router } from "express";
import {
  addToCart,
  updateCartData,
  getUserCartData,
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/get-cart").get(verifyJWT, getUserCartData);
router.route("/add-to-cart").post(verifyJWT, addToCart);
router.route("/update-cart").post(verifyJWT, updateCartData);

export default router;
