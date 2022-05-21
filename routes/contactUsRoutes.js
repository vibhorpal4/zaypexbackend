import { Router } from "express";
import * as contactUsController from "../controllers/contactUsController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create", contactUsController.createContact);
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  contactUsController.getContacts
);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  contactUsController.getContactById
);

export default router;
