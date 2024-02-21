import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from "./../middlewares/auth.middleware.js";
import { createProductController,getProductController,getSingleProductController ,productPhotoController} from "../controllers/product.controller.js";

const router = express.Router();

// routes

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.get("/get-product",getProductController);

router.get("get-product/:slug",getSingleProductController);

router.get("/product-photo/:pid",productPhotoController)

export default router;
