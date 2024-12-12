"use server";

import prisma from "@/lib/prisma";
import { StudentScore } from "@prisma/client";

export const getLessons = async (
    studentId: string
): Promise<StudentScore[]> => {
    try {
        const data = studentId
            ? await prisma.studentScore.findMany({
                  where: { studentId },
                  orderBy: { createdAt: "desc" },
              })
            : [];

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
