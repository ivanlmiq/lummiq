import * as z from "zod";
import {
    getCustomFieldsSchemaProps,
    getCustomFieldsDefaultValues,
} from "@/types/schemas/dynamic-schemas";
import type { CustomFields } from "@prisma/client";

export const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string(),
    address: z.string().optional(),
    password: z.string().min(8).max(100),
});

export type FormValues = z.infer<typeof formSchema>;

export const getParentSchema = (customFields: CustomFields[]) => {
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
            address: "",
            password: "",
        },
        ...dynamicDefaults,
    };
};
