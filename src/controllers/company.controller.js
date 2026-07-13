import companyService from "../services/company.service.js";

import ApiResponse from "../utils/ApiResponse.js";

import {
  createCompanySchema,
  updateCompanySchema,
} from "../validators/company.validator.js";

class CompanyController {
  async createCompany(req, res, next) {
    try {
      const validatedData = createCompanySchema.parse(req.body);

      const company = await companyService.createCompany(
        req.user.id,
        validatedData
      );

      return res.status(201).json(
        new ApiResponse(
          201,
          "Company created successfully",
          company
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getMyCompany(req, res, next) {
    try {
      const company = await companyService.getMyCompany(req.user.id);

      return res.status(200).json(
        new ApiResponse(
          200,
          "Company fetched successfully",
          company
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateCompany(req, res, next) {
    try {
      const validatedData = updateCompanySchema.parse(req.body);

      const company = await companyService.updateCompany(
        req.user.id,
        req.params.id,
        validatedData
      );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Company updated successfully",
          company
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteCompany(req, res, next) {
    try {
      await companyService.deleteCompany(
        req.user.id,
        req.params.id
      );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Company deleted successfully",
          null
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new CompanyController();