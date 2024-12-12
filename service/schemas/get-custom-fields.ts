"use server";

import prisma from "@/lib/prisma";
import { CustomFields } from "@prisma/client";

export const getCustomFields = async (
    schoolId: string,
    schema: string
): Promise<CustomFields[]> => {
    try {
        if (!schoolId || !schema) return [];

        const customFields = await prisma.customFields.findMany({
            where: { OR: [{ schemas: { hasSome: [schema] }, schoolId }] },
        });

        return customFields;
    } catch (error) {
        console.log("[GET_CUSTOM_FIELDS]", error);
        return [];
    }
};
