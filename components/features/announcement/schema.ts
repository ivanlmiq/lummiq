import * as z from "zod";

export const formSchema = z.object({
    title: z.string().min(2),
    content: z.string().min(2),
    date: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;
