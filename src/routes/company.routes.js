import { Router } from "express";

import companyController from "../controllers/company.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company Management APIs
 */

router.use(authMiddleware);

router.use(roleMiddleware("RECRUITER"));

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lesmana Digital
 *               description:
 *                 type: string
 *                 example: Software House and IT Consultant
 *               location:
 *                 type: string
 *                 example: Bandung
 *               industry:
 *                 type: string
 *                 example: Information Technology
 *               website:
 *                 type: string
 *                 example: https://lesmanadigital.com
 *               logo:
 *                 type: string
 *                 example: /uploads/logo.png
 *     responses:
 *       201:
 *         description: Company created successfully
 */
router.post("/", companyController.createCompany);

/**
 * @swagger
 * /api/companies/me:
 *   get:
 *     summary: Get my company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company fetched successfully
 */
router.get("/me", companyController.getMyCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Update company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrjgx1rz000iq1ykrb98bibr
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lesmana Digital Indonesia
 *               description:
 *                 type: string
 *                 example: Updated company description
 *               location:
 *                 type: string
 *                 example: Jakarta
 *               industry:
 *                 type: string
 *                 example: Technology
 *               website:
 *                 type: string
 *                 example: https://lesmanadigital.id
 *               logo:
 *                 type: string
 *                 example: /uploads/logo-new.png
 *     responses:
 *       200:
 *         description: Company updated successfully
 */
router.put("/:id", companyController.updateCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Delete company
 *     tags: [Company]
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
 *         description: Company deleted successfully
 */
router.delete("/:id", companyController.deleteCompany);

export default router;