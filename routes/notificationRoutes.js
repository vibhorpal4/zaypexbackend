import { Router } from "express";
import * as notificationController from "../controllers/notificatonController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  notificationController.getAllNotification
);
router.put(
  "/read",
  authMiddleware,
  adminMiddleware,
  notificationController.readNotification
);

export default router;
