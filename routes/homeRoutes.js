import { Router } from "express";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import * as homeController from "../controllers/homeController.js";

const router = Router();

//homepage routes
router.get("/", homeController.getHomePage);

//heroText routes
router.post(
  "/hero/text/create",
  authMiddleware,
  adminMiddleware,
  homeController.createHeroText
);
router.get(
  "/hero/text",
  authMiddleware,
  adminMiddleware,
  homeController.getAllHeroTexts
);
router.delete(
  "/hero/text/delete/:id",
  authMiddleware,
  adminMiddleware,
  homeController.deleteHeroText
);

// router.put(
//   "/hero/text/edit/:id",
//   authMiddleware,
//   adminMiddleware,
//   homeController.editHeroText
// );

//heroImage routes
router.get(
  "/hero/image",
  authMiddleware,
  adminMiddleware,
  homeController.getAllHeroImages
);
router.post(
  "/hero/image/create",
  authMiddleware,
  adminMiddleware,
  homeController.createHeroImage
);
router.delete(
  "/hero/image/delete/:id",
  authMiddleware,
  adminMiddleware,
  homeController.deleteHeroImage
);

//about routes
router.post(
  "/about/create",
  authMiddleware,
  adminMiddleware,
  homeController.createAbout
);
router.delete(
  "/about/delete/:id",
  authMiddleware,
  adminMiddleware,
  homeController.deleteAbout
);
router.get(
  "/about",
  authMiddleware,
  adminMiddleware,
  homeController.getAllAbout
);

export default router;
