"use server";

import prisma from "@/lib/prisma";
import type { Class } from "@prisma/client";

export const getClasses = async (schoolId: string): Promise<Class[]> => {
    try {
        const data = schoolId
            ? await prisma.class.findMany({
                  where: { schoolId },
                  orderBy: { createdAt: "desc" },
              })
            : [];

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
