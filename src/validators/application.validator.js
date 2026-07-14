import { z } from "zod";

export const applyJobSchema = z.object({
  jobId: z
    .string()
    .min(1, "Job ID is required"),

  coverLetter: z
    .string()
    .trim()
    .max(1000, "Cover letter must not exceed 1000 characters")
    .optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "REVIEWED",
    "INTERVIEW",
    "ACCEPTED",
    "REJECTED",
  ]),
});