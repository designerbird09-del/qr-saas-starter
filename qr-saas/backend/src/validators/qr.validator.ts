import { z } from "zod";

export const qrTypeEnum = z.enum([
  "URL", "TEXT", "EMAIL", "PHONE", "SMS", "WHATSAPP",
  "WIFI", "CONTACT", "LOCATION", "GOOGLE_MAPS", "UPI", "SOCIAL",
  "EVENT", "CALENDAR", "APP_DOWNLOAD", "INSTAGRAM", "FACEBOOK",
  "X", "LINKEDIN", "YOUTUBE", "TELEGRAM", "DISCORD", "PAYPAL",
  "STRIPE", "PDF", "IMAGE", "VIDEO", "MULTI_LINK",
]);

export const designSchema = z.object({
  foregroundColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  gradientStart: z.string().optional(),
  gradientEnd: z.string().optional(),
  dotShape: z.enum(["square", "rounded", "circle", "diamond", "dot"]).optional(),
  eyeStyle: z.string().optional(),
  frameStyle: z.string().optional(),
  logoUrl: z.string().optional(),
  margin: z.number().int().min(0).max(20).optional(),
  errorCorrection: z.enum(["L", "M", "Q", "H"]).optional(),
  opacity: z.number().min(0).max(1).optional(),
}).optional();

export const createQrSchema = z.object({
  name: z.string().min(1),
  type: qrTypeEnum,
  targetValue: z.string().min(1),
  isDynamic: z.boolean().optional(),
  folderId: z.string().optional(),
  design: designSchema,
});

export const updateQrSchema = z.object({
  name: z.string().min(1).optional(),
  targetValue: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  expiresAt: z.string().datetime().optional(),
  scanLimit: z.number().int().positive().optional(),
  isFavorite: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  folderId: z.string().nullable().optional(),
  design: designSchema,
});

export type CreateQrInput = z.infer<typeof createQrSchema>;
export type UpdateQrInput = z.infer<typeof updateQrSchema>;
