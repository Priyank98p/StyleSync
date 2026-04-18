import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Order placed using COD
const placeOrderCOD = async (req, res, next) => {
  try {
    const userId = req?.user._id;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      amount,
      items,
      paymentMethod: "COD",
      payment: false,
      address,
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res
      .status(200)
      .json(new ApiResponse(201, {}, "Order placed successfully!"));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Order placed using Stripe
const placeOrderStripe = async (req, res) => {};

// order placed using razorpay
const placeOrderRazorpay = async (req, res) => {};

// All orders on admin dashboard
const allOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "All orders fetched successfully"));
  } catch (error) {
    console.error("All Orders Error:", error);

    next(new ApiError(500, "Failed to retrieve orders"));
  }
};

// order status admin panel
const updateStatus = async (req, res) => {};

// user orders
const userOrders = async (req, res) => {
  const userId = req?.user._id;
  const orders = await Order.find({ userId });

  if (!orders || orders.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No orders found"));
  }
  res.status(200).json(new ApiResponse(201, orders, "Orders fetched"));
};

export {
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorpay,
  updateStatus,
  allOrders,
  userOrders,
};
