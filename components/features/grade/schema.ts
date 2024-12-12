import * as z from "zod";

export const formSchema = z.object({
    level: z.string().min(1),
    gradeCategoryId: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;
