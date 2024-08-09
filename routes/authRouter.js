import express from "express";
import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";
import { protectedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/v1/auth/register
router.post("/register", registerUser);

// POST /api/v1/auth/login
router.post("/login", loginUser);

// GET /api/v1/auth/logout
router.get("/logout", protectedMiddleware, logoutUser);

// GET /api/v1/auth/getUser
router.get("/getuser", protectedMiddleware, getCurrentUser);

export default router;
