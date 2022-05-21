import { Router } from "express";
import * as productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.getAllproducts
);

router.get("/:category", productController.getProductBySubCategory);

router.delete(
  "/delete/:slug",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

router.put(
  "/update/:slug",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);

router.get("/:slug", productController.getProductBySlug);

export default router;
