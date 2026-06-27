import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .max(20, "Telefone muito longo")
    .regex(/^[\d\s\(\)\-\+]+$/, "Formato de telefone inválido"),
  email: z
    .string()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo")
    .optional()
    .or(z.literal("")),
  objective: z.string().max(100).optional(),
  message: z
    .string()
    .max(1000, "Mensagem muito longa")
    .optional(),
  lgpdConsent: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar a política de privacidade"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const appointmentSchema = z.object({
  leadId: z.string().cuid(),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const postSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  content: z.string().min(10),
  excerpt: z.string().max(300).optional(),
  coverImage: z.string().url().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  readTime: z.number().int().positive().optional(),
  categoryId: z.string().cuid().optional(),
});

export type PostInput = z.infer<typeof postSchema>;
