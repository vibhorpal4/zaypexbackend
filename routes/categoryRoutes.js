import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import * as categoryController from "../controllers/categoryController.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  categoryController.craeteCategory
);

router.get("/", categoryController.getAllCategory);

router.delete(
  "/delete/:slug",
  authMiddleware,
  adminMiddleware,
  categoryController.deleteCategory
);

router.put(
  "/update/:slug",
  authMiddleware,
  adminMiddleware,
  categoryController.updateCategory
);

router.get("/:slug", categoryController.getCategoryBySlug);

export default router;
