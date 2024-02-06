import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { requireSignIn } from "./../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

// protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
