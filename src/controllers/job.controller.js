import jobService from "../services/job.service.js";

import ApiResponse from "../utils/ApiResponse.js";

import {
  createJobSchema,
  updateJobSchema,
} from "../validators/job.validator.js";

class JobController {
  async createJob(req, res, next) {
    try {
      const validatedData = createJobSchema.parse(req.body);

      const job = await jobService.createJob(
        req.user.id,
        validatedData
      );

      return res.status(201).json(
        new ApiResponse(
          201,
          "Job created successfully",
          job
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllJobs(req, res, next) {
    try {
      const jobs = await jobService.getAllJobs(req.query);

      return res.status(200).json(
        new ApiResponse(
          200,
          "Jobs fetched successfully",
          jobs
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getJobById(req, res, next) {
    try {
      const job = await jobService.getJobById(req.params.id);

      return res.status(200).json(
        new ApiResponse(
          200,
          "Job fetched successfully",
          job
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateJob(req, res, next) {
    try {
      const validatedData = updateJobSchema.parse(req.body);

      const job = await jobService.updateJob(
        req.user.id,
        req.params.id,
        validatedData
      );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Job updated successfully",
          job
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteJob(req, res, next) {
    try {
      await jobService.deleteJob(
        req.user.id,
        req.params.id
      );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Job deleted successfully",
          null
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new JobController();