import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  location: z
    .string()
    .trim()
    .max(100, "Location must not exceed 100 characters")
    .optional(),

  industry: z
    .string()
    .trim()
    .max(100, "Industry must not exceed 100 characters")
    .optional(),

  website: z
    .string()
    .trim()
    .url("Website must be a valid URL")
    .optional(),

  logo: z
    .string()
    .trim()
    .optional(),
});

export const updateCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name must not exceed 100 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  location: z
    .string()
    .trim()
    .max(100, "Location must not exceed 100 characters")
    .optional(),

  industry: z
    .string()
    .trim()
    .max(100, "Industry must not exceed 100 characters")
    .optional(),

  website: z
    .string()
    .trim()
    .url("Website must be a valid URL")
    .optional(),

  logo: z
    .string()
    .trim()
    .optional(),
});