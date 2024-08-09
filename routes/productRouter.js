import express from "express";
import {
  createProduct,
  allProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  fileUploadProduct,
} from "../controllers/productController.js";
import {
  protectedMiddleware,
  ownerMiddleware,
} from "../middleware/authMiddleware.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// POST /api/v1/product (Owner Only)
router.post("/", protectedMiddleware, ownerMiddleware, createProduct);

// GET /api/v1/product
router.get("/", allProduct);

// GET /api/v1/product/:id
router.get("/:id", detailProduct);

// PUT /api/v1/product/:id (Owner Only)
router.put("/:id", protectedMiddleware, ownerMiddleware, updateProduct);

// DELETE /api/v1/product/:id (Owner Only)
router.delete("/:id", protectedMiddleware, ownerMiddleware, deleteProduct);

// POST /api/v1/product/file-upload (Owner Only)
router.post(
  "/file-upload",
  protectedMiddleware,
  ownerMiddleware,
  upload.single("image"),
  fileUploadProduct
);

export default router;
