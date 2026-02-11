import { z } from "zod";

// --- Status enum (mirrors Prisma enum) ---
export const statusEnum = z.enum(["ENABLED", "DISABLED", "DELETED"]);
export type Status = z.infer<typeof statusEnum>;

// --- Contact form/create schema (what the form submits / POST body) ---
export const contactFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-().]{7,20}$/, "Invalid phone number format"),
  notes: z.string().max(1000, "Notes must be 1000 characters or less").nullable(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// --- Full contact schema (what comes back from the DB/API) ---
export const contactSchema = contactFormSchema.extend({
  id: z.number(),
  created_time: z.union([z.string(), z.date()]),
  updated_time: z.union([z.string(), z.date()]),
  status: statusEnum,
  verified: z.boolean(),
});

export type Contact = z.infer<typeof contactSchema>;
