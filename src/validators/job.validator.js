import { z } from "zod";

export const createJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  location: z
    .string()
    .trim()
    .max(100, "Location must not exceed 100 characters")
    .optional(),

  jobType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
  ]),

  experience: z
    .enum([
      "FRESHER",
      "JUNIOR",
      "MID",
      "SENIOR",
    ])
    .optional(),

  salaryMin: z
    .number()
    .int()
    .nonnegative()
    .optional(),

  salaryMax: z
    .number()
    .int()
    .nonnegative()
    .optional(),

  deadline: z
    .string()
    .datetime()
    .optional(),

  status: z
    .enum([
      "OPEN",
      "CLOSED",
    ])
    .optional(),
});

export const updateJobSchema = createJobSchema.partial();