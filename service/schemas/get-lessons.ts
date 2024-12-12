"use server";

import prisma from "@/lib/prisma";
import type { Lesson } from "@prisma/client";

export const getLessons = async (schoolId: string): Promise<Lesson[]> => {
    try {
        const data = schoolId
            ? await prisma.lesson.findMany({
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
