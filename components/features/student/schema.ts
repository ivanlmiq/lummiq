import * as z from "zod";
import {
    getCustomFieldsSchemaProps,
    getCustomFieldsDefaultValues,
} from "@/types/schemas/dynamic-schemas";
import type { CustomFields } from "@prisma/client";

export const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    genre: z.enum(["MALE", "FEMALE"]),
    pin: z.string().min(4),
    phone: z.string().min(10),
    password: z.string().min(6),
    classId: z.string().min(1, "Grade is required"),
});

export type FormValues = z.infer<typeof formSchema>;

export const getStudentSchema = (customFields: CustomFields[]) => {
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
            pin: "",
            password: "",
            classId: "",
        },
        ...dynamicDefaults,
    };
};
