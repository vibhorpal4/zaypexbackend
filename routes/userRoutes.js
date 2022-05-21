import { Router } from "express";
import * as userController from "../controllers/userController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, userController.getUsers);
router.get(
  "/:username",
  authMiddleware,
  adminMiddleware,
  userController.getUserByUsername
);
router.put(
  "/:username/change-role",
  authMiddleware,
  adminMiddleware,
  userController.changeRole
);
router.delete(
  "/:username/delete",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

router.put("/change-password", authMiddleware, userController.changePassword);

export default router;
