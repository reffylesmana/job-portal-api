import { Router } from "express";

import authController from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and Authorization APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Reffy
 *               email:
 *                 type: string
 *                 example: reffy@gmail.com
 *               password:
 *                 type: string
 *                 example: reffy123
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - RECRUITER
 *                   - JOB_SEEKER
 *                 example: JOB_SEEKER
 *     responses:
 *       201:
 *         description: Register successful
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: reffy@gmail.com
 *               password:
 *                 type: string
 *                 example: reffy123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post("/refresh-token", authController.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.get(
  "/profile",
  authMiddleware,
  authController.profile
);

/**
 * @swagger
 * /api/auth/recruiter:
 *   get:
 *     summary: Recruiter only endpoint
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recruiter access granted
 */
router.get(
  "/recruiter",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  authController.recruiterOnly
);

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     summary: Admin only endpoint
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 */
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  authController.adminOnly
);

export default router;