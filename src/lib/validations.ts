import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    company: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const campaignSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  targetUrl: z.string().url("Must be a valid URL"),
  altText: z.string().optional(),
  placementId: z.string().min(1, "Select a placement"),
  orderId: z.string().min(1, "Select an order"),
});

export const checkoutSchema = z.object({
  placementId: z.string(),
  durationType: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  durationValue: z.number().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CampaignInput = z.infer<typeof campaignSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
