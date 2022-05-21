import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import * as aboutUsController from "../controllers/aboutUsController.js";

const router = Router();

router.get("/", aboutUsController.getAllAbout);

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  aboutUsController.createAbout
),
  router.get("/:slug", aboutUsController.getAboutBySlug);
router.put(
  "/:slug/edit",
  authMiddleware,
  adminMiddleware,
  aboutUsController.editAboutUs
);

router.delete(
  "/delete/:slug",
  authMiddleware,
  adminMiddleware,
  aboutUsController.deleteAboutBySlug
);

export default router;
