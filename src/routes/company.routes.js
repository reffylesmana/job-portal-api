import { Router } from "express";

import companyController from "../controllers/company.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.use(authMiddleware);

router.use(roleMiddleware("RECRUITER"));

router.post("/", companyController.createCompany);

router.get("/me", companyController.getMyCompany);

router.put("/:id", companyController.updateCompany);

router.delete("/:id", companyController.deleteCompany);

export default router;