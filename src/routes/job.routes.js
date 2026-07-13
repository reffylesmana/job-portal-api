import { Router } from "express";

import jobController from "../controllers/job.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", jobController.getAllJobs);

router.get("/:id", jobController.getJobById);

/*
|--------------------------------------------------------------------------
| Recruiter Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  jobController.createJob
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  jobController.updateJob
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  jobController.deleteJob
);

export default router;