"use server";

import prisma from "@/lib/prisma";
import type { Exam } from "@prisma/client";

export const getExams = async (schoolId: string): Promise<Exam[]> => {
    try {
        const data = schoolId
            ? await prisma.exam.findMany({
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
