import { z } from "zod";

export const emailSchema = z.string().email("Invalid email format");
export const passwordSchema = z
    .string()
    .min(8, { message: "Password must have minimum 8 characters" })
    .max(32, { message: "Password must be max 32 characters" })
    .refine((password) => /[A-Z]/.test(password), {
        message: "Password must have uppercase letters",
    })
    .refine((password) => /[a-z]/.test(password), {
        message: "Password must have lowercase letters",
    })
    .refine((password) => /[0-9]/.test(password), { message: "Password must contain a number" })
    .refine((password) => /[!@#$%^&*+-_/]/.test(password), {
        message: "Password must contain a special character",
    });

export const confirmPasswordSchema = (originalPassword: string) =>
    z.string().refine((val) => val === originalPassword, {
        message: "Passwords do not match",
    });
