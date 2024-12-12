import * as z from "zod";
import type { CustomFields } from "@prisma/client";

export const getCustomFieldsSchemaProps = (customFields: CustomFields[]) => {
    const dynamicFields: Record<string, z.ZodTypeAny> = {};

    customFields.forEach((field) => {
        let fieldSchema: z.ZodTypeAny;

        switch (field.type) {
            case "string":
                fieldSchema = field.required
                    ? z.string().min(field.min || 1)
                    : z
                          .string()
                          .optional()
                          .default(field.defaultValue as string);
                break;
            case "number":
                fieldSchema = field.required
                    ? z.number()
                    : z.number().optional().default(Number(field.defaultValue));
                break;
            case "boolean":
                fieldSchema = field.required
                    ? z.boolean()
                    : z
                          .boolean()
                          .optional()
                          .default(Boolean(field.defaultValue));
                break;
            case "date":
                fieldSchema = field.required ? z.date() : z.date().optional();
                break;
            default:
                fieldSchema = z.any();
        }

        dynamicFields[field.name] = fieldSchema;
    });

    return dynamicFields;
};

export const getCustomFieldsDefaultValues = (customFields: CustomFields[]) => {
    const dynamicDefaults: Record<
        string,
        string | number | boolean | Date | unknown
    > = {};

    customFields.forEach((field) => {
        if (field.type === "string") {
            dynamicDefaults[field.name] = "";
        } else if (field.type === "number") {
            dynamicDefaults[field.name] = 0;
        } else if (field.type === "boolean") {
            dynamicDefaults[field.name] = false;
        } else if (field.type === "date") {
            dynamicDefaults[field.name] = null;
        } else {
            dynamicDefaults[field.name] = null;
        }
    });

    return dynamicDefaults;
}
