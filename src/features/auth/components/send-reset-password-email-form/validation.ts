import { z } from "zod";

export const sendResetEmailSchema = z.object({
    email: z.string().email("Invalid email format"),
});
