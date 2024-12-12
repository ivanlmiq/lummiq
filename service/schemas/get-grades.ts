"use server";

import prisma from "@/lib/prisma";
import type { GradeColumn } from "@/components/features/grade/columns";

export const getGrades = async (schoolId: string): Promise<GradeColumn[]> => {
    try {
        const grades = schoolId
            ? await prisma.grade.findMany({
                  where: { schoolId },
                  include: {
                      classess: {
                          select: { id: true, name: true },
                      },
                  },
                  orderBy: { level: "asc" },
              })
            : [];

        grades.sort((a, b) => Number(a.level) - Number(b.level));

        const data = grades.map((grade) => ({
            ...grade,
            classes:
                grade.classess?.length > 0
                    ? grade.classess.map((c) => c.name).join(", ")
                    : "",
        }));

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
