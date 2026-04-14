import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import validator from "validator";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if ([fullname, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser)
    throw new ApiError(409, "User already exits with this email!");

  if (!validator.isEmail(email))
    throw new ApiError(400, "Please enter a valid email!");

  if (password.length < 8)
    throw new ApiError(400, "Password must be at least 8 characters!");
  const user = await User.create({
    fullname,
    email,
    password,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!userCreated) throw new ApiError(500, "User registeration failed!!");

  return res
    .status(200)
    .json(new ApiResponse(201, userCreated, "User registeration successfull!"));
});

const loginUser = asyncHandler(async (req, res) => {});

const adminLogin = asyncHandler(async (req, res) => {});
export { registerUser, loginUser, adminLogin };
