import { Router } from "express";

import applicationController from "../controllers/application.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Application
 *   description: Job Application APIs
 */

/*
|--------------------------------------------------------------------------
| Job Seeker Routes
|--------------------------------------------------------------------------
*/

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Apply for a job
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *               - cv
 *             properties:
 *               jobId:
 *                 type: string
 *                 example: cmrjgx1rz000iq1ykrb98bibr
 *               coverLetter:
 *                 type: string
 *                 example: Saya tertarik bergabung di perusahaan ini.
 *               cv:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Application submitted successfully
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("JOB_SEEKER"),
  upload.single("cv"),
  applicationController.applyJob
);

/**
 * @swagger
 * /api/applications/me:
 *   get:
 *     summary: Get my applications
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of my applications
 */
router.get(
  "/me",
  authMiddleware,
  roleMiddleware("JOB_SEEKER"),
  applicationController.getMyApplications
);

/*
|--------------------------------------------------------------------------
| Recruiter Routes
|--------------------------------------------------------------------------
*/

/**
 * @swagger
 * /api/applications/job/{jobId}:
 *   get:
 *     summary: Get applicants by job
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrjgx1rz000iq1ykrb98bibr
 *     responses:
 *       200:
 *         description: List of applicants
 */
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  applicationController.getApplicants
);

/**
 * @swagger
 * /api/applications/{id}/status:
 *   put:
 *     summary: Update application status
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrkxoxeg0005q1rswjwndaec
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - REVIEWED
 *                   - INTERVIEW
 *                   - ACCEPTED
 *                   - REJECTED
 *                 example: INTERVIEW
 *     responses:
 *       200:
 *         description: Application status updated successfully
 */
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  applicationController.updateApplicationStatus
);

export default router;