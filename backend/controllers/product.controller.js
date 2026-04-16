import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Products } from "../models/product.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  // Destructure and Sanitize
  const { name, description, category, subCategory, price, sizes, topSelling } =
    req.body;

  // Extract and Filter Files
  const imageKeys = ["image1", "image2", "image3", "image4"];
  const localPaths = imageKeys
    .map((key) => req.files?.[key]?.[0]?.path)
    .filter((path) => !!path); // Removes undefined/null values

  if (localPaths.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }

  //Parallel Cloudinary Upload Promise.all is faster than a 'for' loop for network requests
  const uploadResults = await Promise.all(
    localPaths.map((path) => uploadOnCloudinary(path)),
  );

  // Filter out any failed uploads (where cloudinary utility returned null)
  const imageUrls = uploadResults
    .filter((result) => result !== null)
    .map((result) => result.secure_url);

  if (imageUrls.length === 0) {
    throw new ApiError(500, "Failed to upload images to cloud storage");
  }

  let parsedSizes;
  try {
    parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
  } catch (error) {
    throw new ApiError(400, "Invalid format for sizes. Expected an array.");
  }

  const product = await Products.create({
    name,
    description,
    category,
    subCategory,
    price: Number(price),
    sizes: parsedSizes,
    topSelling: topSelling === "true" || topSelling === true,
    image: imageUrls,
  });

  if (!product) {
    throw new ApiError(500, "Product creation failed in database");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product added successfully"));
});

const listProducts = asyncHandler(async (req, res) => {
  const allProducts = await Products.find({}).sort({ createdAt: -1 }); // Sort by newest first
  if (!allProducts) throw new ApiError(400, "Products fetching failed");

  return res
    .status(200)
    .json(new ApiResponse(201, allProducts, "Products fetched successfully"));
});
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const deletedProduct = await Products.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new ApiError(404, "Product not found; nothing to delete");
    }
    return res
      .status(200)
      .json(new ApiResponse(201, {}, "Removed product successfully!"));
  } catch (error) {
    throw new ApiError(400, "Removing product failed!");
  }
});
const singleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const product = await Products.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, product, "Product fetched successfully"));
});

export { listProducts, addProduct, removeProduct, singleProduct };
