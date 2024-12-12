import * as z from "zod";
import {
    getCustomFieldsDefaultValues,
    getCustomFieldsSchemaProps,
} from "@/types/schemas/dynamic-schemas";
import type { CustomFields } from "@prisma/client";

export const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    phone: z.string().min(10),
    role: z.enum(["TEACHER", "TEACHER_ASSISTANT"]),
});

export type FormValues = z.infer<typeof formSchema>;

export const getTeacherSchema = (customFields: CustomFields[]) => {
    const dynamicFields = getCustomFieldsSchemaProps(customFields);

    return formSchema.extend(dynamicFields);
};

export const getDefaultValues = (customFields: CustomFields[]) => {
    const dynamicDefaults = getCustomFieldsDefaultValues(customFields);

    return {
        ...{
            name: "",
            email: "",
            phone: "",
            password: "",
            role: "TEACHER" as "TEACHER" | "TEACHER_ASSISTANT",
        },
        ...dynamicDefaults,
    };
};
