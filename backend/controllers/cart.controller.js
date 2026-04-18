import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addToCart = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { itemId, size } = req.body;
    const userData = await User.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    return res.json(new ApiResponse(201, {}, "Item added to cart"));
  } catch (error) {
    next(error);
  }
};
const updateCartData = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData || {};

    if (quantity === 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      } else {
        // Ensure the item exists before assigning size
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;
      }
    }
    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    return res.json(new ApiResponse(201, {}, "Cart updated"));
  } catch (error) {
    throw new ApiError(400, "Update cart failed");
  }
};
const getUserCartData = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const userData = await User.findById(userId);
    const cartData = await userData.cartData || {};

    return res.json(
      new ApiResponse(201, cartData, "Cartdata fetched successfully"),
    );
  } catch (error) {
    next(error)
  }
};

export { addToCart, updateCartData, getUserCartData };
