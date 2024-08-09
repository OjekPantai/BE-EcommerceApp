import express from "express";
import {
  protectedMiddleware,
  ownerMiddleware,
} from "../middleware/authMiddleware.js";
import {
  createOrder,
  allOrder,
  detailOrder,
  currentUserOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// POST /api/v1/order
router.post("/", protectedMiddleware, createOrder);

// GET /api/v1/order (Owner Only)
router.get("/", protectedMiddleware, ownerMiddleware, allOrder);

// GET /api/v1/order/:id (Owner Only)
router.get("/:id", protectedMiddleware, ownerMiddleware, detailOrder);

// GET /api/v1/order/current/user
router.get("/current/user", protectedMiddleware, currentUserOrder);

export default router;
