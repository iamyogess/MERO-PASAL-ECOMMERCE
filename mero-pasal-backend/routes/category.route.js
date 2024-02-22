import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/auth.middleware.js";
import {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller.js";
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
router.get("/get-category", getCategoryController);
router.get("/single-category/:slug", getSingleCategoryController);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
