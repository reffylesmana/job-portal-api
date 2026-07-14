import { Router } from "express";

import jobController from "../controllers/job.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Job
 *   description: Job Management APIs
 */

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Job]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: backend
 *         description: Search job by title
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         example: Bandung
 *         description: Filter by location
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP]
 *       - in: query
 *         name: experience
 *         schema:
 *           type: string
 *           enum: [FRESHER, JUNIOR, MID, SENIOR]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [OPEN, CLOSED]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: salaryMax
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get("/", jobController.getAllJobs);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Job]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrjgx1rz000iq1ykrb98bibr
 *     responses:
 *       200:
 *         description: Job detail
 */
router.get("/:id", jobController.getJobById);

/*
|--------------------------------------------------------------------------
| Recruiter Routes
|--------------------------------------------------------------------------
*/

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create new job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - jobType
 *             properties:
 *               title:
 *                 type: string
 *                 example: Backend Developer
 *               description:
 *                 type: string
 *                 example: Develop REST API using Express.js
 *               location:
 *                 type: string
 *                 example: Bandung
 *               jobType:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP]
 *               experience:
 *                 type: string
 *                 enum: [FRESHER, JUNIOR, MID, SENIOR]
 *               salaryMin:
 *                 type: integer
 *                 example: 6000000
 *               salaryMax:
 *                 type: integer
 *                 example: 9000000
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [OPEN, CLOSED]
 *     responses:
 *       201:
 *         description: Job created successfully
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  jobController.createJob
);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrjgx1rz000iq1ykrb98bibr
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  jobController.updateJob
);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrjgx1rz000iq1ykrb98bibr
 *     responses:
 *       200:
 *         description: Job deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  jobController.deleteJob
);

export default router;