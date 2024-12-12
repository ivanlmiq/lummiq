import * as z from "zod";
import {
    getCustomFieldsSchemaProps,
    getCustomFieldsDefaultValues,
} from "@/types/schemas/dynamic-schemas";
import type { CustomFields } from "@prisma/client";

export const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    address: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export const getSchoolSchema = (customFields: CustomFields[]) => {
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
        },
        ...dynamicDefaults,
    };
};
