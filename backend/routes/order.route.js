import {
  placeOrderCOD,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay
} from "../controllers/order.controller.js";
import { verifyJWT ,isAdmin } from "../middleware/auth.middleware.js";
import {Router} from "express"

const router = Router()

// admin feature routes
router.route("/allorders").get(verifyJWT,isAdmin,allOrders)
router.route("/status").post(verifyJWT,isAdmin,updateStatus)

// place order routes
router.route("/place").post(verifyJWT,placeOrderCOD)
router.route("/stripe").post(verifyJWT,placeOrderStripe)
router.route("/razorpay").post(verifyJWT,placeOrderRazorpay)

// verify payments
router.route("/verify-stripe").post(verifyJWT,verifyStripe)
router.route("/verify-razorpay").post(verifyJWT,verifyRazorpay)

// user route features
router.route("/user-orders").get(verifyJWT,userOrders)

export default router