import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) return null;
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully", response.url);

    fs.unlinkSync(localPath);
    return response;
  } catch (error) {
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    console.log("File upload failed", error);
    return null;
  }
};

export default uploadOnCloudinary;
