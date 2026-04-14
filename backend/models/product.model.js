import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    topSelling: {
      type: Boolean,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Products =
  mongoose.models.product || mongoose.model("Products", productSchema);
