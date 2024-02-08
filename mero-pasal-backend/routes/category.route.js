import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/auth.middleware.js";
import { createCategoryController, updateCategoryController } from "../controllers/category.controller.js";
const router = express.Router();

//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

export default router;
