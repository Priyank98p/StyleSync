import { Router } from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// route for listing products
router.route("/allProducts").get(listProducts);

// route for adding products
router.route("/add").post(
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    {
      name: "image2",
      maxCount: 1,
    },
    {
      name: "image3",
      maxCount: 1,
    },
    {
      name: "image4",
      maxCount: 1,
    },
  ]),
  addProduct,
);

// route for removing product
router.route("/remove").post(removeProduct);

// route for single product
router.route("/single").post(singleProduct);

export default router;
