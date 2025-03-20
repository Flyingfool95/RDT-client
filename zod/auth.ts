import { z } from "zod";

export const loginSchema = z
    .object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(8, "Password must be at least 8 characters"),
    })
    .strict();

export const registerSchema = loginSchema
    .extend({
        confirmPassword: z.string(),
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const updateUserSchema = z
    .object({
        email: z.string().email().optional(),
        name: z.string().min(2).optional(),
        currentPassword: z.string().min(8).optional(),
        newPassword: z.string().min(8).optional(),
    })
    .refine((data) => {
        if (data.newPassword && !data.currentPassword) return false;
        return true;
    }, "Current password is required when changing password");
