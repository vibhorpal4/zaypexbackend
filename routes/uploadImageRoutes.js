import { Router } from "express";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import * as imageUploadController from "../controllers/uploadImageController.js";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  imageUploadController.uploadImage
);

export default router;
