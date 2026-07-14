import applicationService from "../services/application.service.js";

import ApiResponse from "../utils/ApiResponse.js";

import {
  applyJobSchema,
  updateApplicationStatusSchema,
} from "../validators/application.validator.js";

class ApplicationController {
  async applyJob(req, res, next) {
    try {
      const validatedData = applyJobSchema.parse(req.body);

      const application = await applicationService.applyJob(
        req.user.id,
        {
          ...validatedData,
          cv: req.file.path,
        }
      );

      return res.status(201).json(
        new ApiResponse(
          201,
          "Application submitted successfully",
          application
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getMyApplications(req, res, next) {
    try {
      const applications =
        await applicationService.getMyApplications(
          req.user.id
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Applications fetched successfully",
          applications
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getApplicants(req, res, next) {
    try {
      const applicants =
        await applicationService.getApplicants(
          req.user.id,
          req.params.jobId
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Applicants fetched successfully",
          applicants
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateApplicationStatus(req, res, next) {
    try {
      const validatedData =
        updateApplicationStatusSchema.parse(req.body);

      const application =
        await applicationService.updateApplicationStatus(
          req.user.id,
          req.params.id,
          validatedData.status
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Application status updated successfully",
          application
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new ApplicationController();