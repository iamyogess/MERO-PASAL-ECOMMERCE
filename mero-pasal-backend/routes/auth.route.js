import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { isAdmin, requireSignIn } from "./../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

// protected route user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

// protected route admin
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

//forgot password
router.post("/forgot-password", forgotPasswordController);

export default router;
