import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

class ApplicationService {
  async applyJob(userId, data) {
    const job = await prisma.job.findUnique({
      where: {
        id: data.jobId,
      },
    });

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    if (job.status !== "OPEN") {
      throw new ApiError(400, "Job is closed");
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId: data.jobId,
          userId,
        },
      },
    });

    if (existingApplication) {
      throw new ApiError(409, "You have already applied for this job");
    }

    const application = await prisma.application.create({
      data: {
        jobId: data.jobId,
        userId,
        cv: data.cv,
        coverLetter: data.coverLetter,
      },
    });

    return application;
  }

  async getMyApplications(userId) {
    return await prisma.application.findMany({
      where: {
        userId,
      },

      include: {
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                location: true,
              },
            },
          },
        },
      },

orderBy: {
    appliedAt: "desc"
},
    });
  }

  async getApplicants(userId, jobId) {
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
        "You are not allowed to view applicants"
      );
    }

    return await prisma.application.findMany({
      where: {
        jobId,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },

      orderBy: {
    appliedAt: "desc"
  },
    });
  }

  async updateApplicationStatus(userId, applicationId, status) {
    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },

      include: {
        job: true,
      },
    });

    if (!application) {
      throw new ApiError(404, "Application not found");
    }

    const company = await prisma.company.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    if (application.job.companyId !== company.id) {
      throw new ApiError(
        403,
        "You are not allowed to update this application"
      );
    }

    return await prisma.application.update({
      where: {
        id: applicationId,
      },

      data: {
        status,
      },
    });
  }
}

export default new ApplicationService();