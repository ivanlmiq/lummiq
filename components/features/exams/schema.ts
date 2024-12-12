import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
});

export type FormValues = z.infer<typeof formSchema>;
