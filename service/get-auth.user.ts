"use server";

import prisma from "@/lib/prisma";
import type { AuthTeacher } from "@/types/service";

export const getAuthUser = async (id: string): Promise<AuthTeacher> => {
    try {
        const user = await prisma.teacher.findUnique({
            where: { id },
        });

        if (!user) return null;

        const schoolWhereClause = {
            PRINCIPAL: { userId: id },
            TEACHER: { id: user.schoolId },
        };

        const schools = await prisma.school.findMany({
            select: {
                id: true,
                name: true,
                language: true,
            },
            where: schoolWhereClause[
                user.role as keyof typeof schoolWhereClause
            ],
        });

        return {
            ...user,
            schools,
        };
    } catch (error) {
        console.error(error);

        return null;
    }
};
