import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    code: z.string(),
    type: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;
