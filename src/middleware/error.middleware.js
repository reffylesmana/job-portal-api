import { ZodError } from "zod";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Custom ApiError
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  // Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation Error",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Prisma Unique Constraint Error
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: "Duplicate data",
    });
  }

  // Prisma Record Not Found
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Data not found",
    });
  }

  // Unknown Error
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;