"use server";

import prisma from "@/lib/prisma";
import type { SubjectColumn } from "@/components/features/subject/column";

export const getSubjects = async (
    schoolId: string
): Promise<SubjectColumn[]> => {
    try {
        const subjects = schoolId
            ? await prisma.subject.findMany({
                  where: { schoolId },
                  orderBy: { createdAt: "desc" },
              })
            : [];

        const data = subjects.map((subject) => ({
            ...subject,
            lessons: [],
        }));

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getSubject = async (id: string, schoolId: string) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id, schoolId },
            include: {
                lessons: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!subject) return null;

        const data = {
            ...subject,
            lessons: subject.lessons.map((lesson) => ({
                id: lesson.id,
                name: lesson.name,
            })),
        };

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
