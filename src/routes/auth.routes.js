import { Router } from "express";

import authController from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

router.get(
  "/profile",
  authMiddleware,
  authController.profile
);

router.get(
  "/recruiter",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  authController.recruiterOnly
);

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  authController.adminOnly
);

export default router;