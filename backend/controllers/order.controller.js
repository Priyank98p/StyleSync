import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

const currency = "inr";
const deliveryCharges = 10;

// payment gateway initialzation
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req?.user._id;
    const { items, amount, address } = req.body;

    const { origin } = req.headers;
    const orderData = {
      userId,
      amount,
      items,
      paymentMethod: "Stripe",
      payment: false,
      address,
    };

    const newOrder = new Order(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      // Format items for Stripe
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery fee
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery fee",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    // Create Session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, { session_url: session.url }, "Session created"),
      );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const verifyStripe = async (req, res, next) => {
  try {
    const { orderId, success } = req.body;
    const userId = req.user._id;

    // Check if Stripe signaled success
    if (success === "true") {
      //  Update the order in DB
      await Order.findByIdAndUpdate(orderId, { payment: true });

      //  Clear the user's cart in DB
      await User.findByIdAndUpdate(userId, { cartData: {} });

      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Payment confirmed and order placed!"));
    } else {
      // delete the pending order record to keep DB clean
      await Order.findByIdAndDelete(orderId);
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Payment was cancelled or failed"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// order placed using razorpay
const placeOrderRazorpay = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      receipt: newOrder._id.toString(),
      notes: { orderId: newOrder._id.toString() }, // Helpful for verification
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) return next(new ApiError(500, error.message));
      res.json(new ApiResponse(200, order, "Razorpay order created"));
    });
  } catch (error) {
    next(error);
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, orderId } = req.body;
    const userId = req.user._id;
    if (razorpay_order_id && razorpay_payment_id) {
      await Order.findOneAndUpdate(orderId, { payment: true });

      await User.findByIdAndUpdate(userId, { cartData: {} });
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Payment confirmed and order placed!"));
    }
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Payment was cancelled or failed"));
  }
};

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
const updateStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });

    return res
      .status(200)
      .json(new ApiResponse(201, {}, "Order status updated"));
  } catch (error) {
    console.error("Status error:", error);

    next(new ApiError(500, "Failed to update status"));
  }
};

// user orders
const userOrders = async (req, res, next) => {
  try {
    const userId = req?.user._id;
    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "No orders found"));
    }
    res.status(200).json(new ApiResponse(201, orders, "Orders fetched"));
  } catch (error) {
    console.error("Orders:", error);

    next(new ApiError(500, "Failed to retrieve user orders"));
  }
};

export {
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorpay,
  updateStatus,
  allOrders,
  userOrders,
  verifyStripe,
  verifyRazorpay,
};
