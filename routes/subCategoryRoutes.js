import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import * as subCategoryController from "../controllers/subCategoryController.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  subCategoryController.createSubCategory
);

router.delete(
  "/delete/:slug",
  authMiddleware,
  adminMiddleware,
  subCategoryController.deleteSubCategory
);

router.get(
  "/category/:category",
  subCategoryController.getAllSubCategoriesOfCategory
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  subCategoryController.getAllSubCategories
);

router.put(
  "/update/:slug",
  authMiddleware,
  adminMiddleware,
  subCategoryController.updateSubCategory
);

router.get("/:slug", subCategoryController.getSubCategoryBySlug);

export default router;
