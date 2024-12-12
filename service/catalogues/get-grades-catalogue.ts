"use server";

import prisma from "@/lib/prisma";
import type { GradeCatalogue } from "@/types/catalogue/catalogue";

export const getGradesCatalogue = async (schoolId: string) => {
    try {
        const catalogue = await prisma.grade.findMany({
            where: { schoolId, status: "ACTIVE" },
            select: { id: true, level: true },
            orderBy: { level: "asc" },
        });

        return catalogue satisfies GradeCatalogue[];
    } catch (error) {
        console.error(error);
        return [];
    }
};
