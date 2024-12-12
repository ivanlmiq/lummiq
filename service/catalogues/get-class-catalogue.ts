"use server";

import prisma from "@/lib/prisma";
import type { ClassCatalogue } from "@/types/catalogue/catalogue";

export const getClassCatalogue = async (schoolId: string) => {
    try {
        const catalogue = await prisma.class.findMany({
            where: { schoolId, status: "ACTIVE" },
            select: { id: true, name: true },
            orderBy: { createdAt: "asc" },
        });

        return catalogue satisfies ClassCatalogue[];
    } catch (error) {
        console.error(error);
        return [];
    }
};
