import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});

export type FormValues = z.infer<typeof formSchema>;
