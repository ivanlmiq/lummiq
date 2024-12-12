"use server";

import prisma from "@/lib/prisma";

export const getDashboardCounts = async (schoolId: string) => {
    try {
        const [teachers, students, announcements] = await prisma.$transaction(
            async (tx) => {
                const commonClause = { where: { schoolId } };

                const teachers = await tx.teacher.count(commonClause);
                const students = await tx.student.count(commonClause);
                const announcements = await tx.announcement.count(commonClause);

                return [teachers, students, announcements];
            }
        );

        return [teachers, students, announcements, 0];
    } catch (error) {
        console.error(error);

        return [0, 0, 0, 0];
    }
};
