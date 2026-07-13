import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

class JobService {
  async createJob(userId, data) {
    const company = await prisma.company.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    const job = await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        jobType: data.jobType,
        experience: data.experience,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        deadline: data.deadline
          ? new Date(data.deadline)
          : null,
        status: data.status ?? "OPEN",
        companyId: company.id,
      },
    });

    return job;
  }

  async getAllJobs(query) {
    const {
      search,
      location,
      jobType,
      experience,
      status,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
    } = query;

    const where = {};

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ];
    }

    if (location) {
      where.location = location;
    }

    if (jobType) {
      where.jobType = jobType;
    }

    if (experience) {
      where.experience = experience;
    }

    if (status) {
      where.status = status;
    }

    const jobs = await prisma.job.findMany({
      where,

      include: {
        company: {
          select: {
            id: true,
            name: true,
            location: true,
            industry: true,
          },
        },
      },

      orderBy: {
        [sort]: order,
      },

      skip: (Number(page) - 1) * Number(limit),

      take: Number(limit),
    });

    const total = await prisma.job.count({
      where,
    });

    return {
      jobs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  async getJobById(jobId) {
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },

      include: {
        company: {
          select: {
            id: true,
            name: true,
            location: true,
            industry: true,
            website: true,
          },
        },
      },
    });

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    return job;
  }

  async updateJob(userId, jobId, data) {
    const company = await prisma.company.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    if (job.companyId !== company.id) {
      throw new ApiError(
        403,
        "You are not allowed to update this job"
      );
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: jobId,
      },

      data: {
        ...data,
        deadline: data.deadline
          ? new Date(data.deadline)
          : undefined,
      },
    });

    return updatedJob;
  }

  async deleteJob(userId, jobId) {
    const company = await prisma.company.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    if (job.companyId !== company.id) {
      throw new ApiError(
        403,
        "You are not allowed to delete this job"
      );
    }

    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    return null;
  }
}

export default new JobService();