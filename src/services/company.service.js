import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

class CompanyService {
  async createCompany(userId, data) {
    const existingCompany = await prisma.company.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (existingCompany) {
      throw new ApiError(409, "You already have a company");
    }

    const company = await prisma.company.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        industry: data.industry,
        website: data.website,
        logo: data.logo,
        ownerId: userId,
      },
    });

    return company;
  }

  async getMyCompany(userId) {
    const company = await prisma.company.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    return company;
  }

  async updateCompany(userId, companyId, data) {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    if (company.ownerId !== userId) {
      throw new ApiError(
        403,
        "You are not allowed to update this company"
      );
    }

    const updatedCompany = await prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        industry: data.industry,
        website: data.website,
        logo: data.logo,
      },
    });

    return updatedCompany;
  }

  async deleteCompany(userId, companyId) {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    if (company.ownerId !== userId) {
      throw new ApiError(
        403,
        "You are not allowed to delete this company"
      );
    }

    await prisma.company.delete({
      where: {
        id: companyId,
      },
    });

    return null;
  }
}

export default new CompanyService();