"use server";

import prisma from "@/lib/prisma";
import type { StudentColumn } from "@/components/features/student/columns";
import type {
    StudentByClass,
    StudentByGrade,
    StudentWithScore,
} from "@/types/schemas/students";

export const getStudents = async (
    schoolId: string
): Promise<StudentColumn[]> => {
    try {
        const students = schoolId
            ? await prisma.student.findMany({
                  where: { schoolId },
                  include: { grade: true, class: true, parents: true },
                  orderBy: { createdAt: "desc" },
              })
            : [];

        const data = students.map((student) => ({
            ...student,
            dob: student.dob?.toLocaleDateString() ?? "",
            grade: student.class?.name ?? "N/A	",
            parents:
                student.parents?.length > 0
                    ? student.parents.map((parent) => parent.name).join(", ")
                    : "N/A",
        }));

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getStudentsByGrade = async (
    id: string,
    schoolId: string
): Promise<StudentByGrade | null> => {
    try {
        const data = await prisma.grade.findFirst({
            where: { id, schoolId },
            select: {
                id: true,
                level: true,
                students: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        photo: true,
                        status: true,
                        studentStatus: true,
                        parents: true,
                    },
                },
            },
        });

        if (!data) return null;

        return {
            ...data,
            students: data?.students.map((student) => ({
                ...student,
                parents:
                    student.parents?.length > 0
                        ? student.parents
                              .map((parent) => parent.name)
                              .join(", ")
                        : "N/A",
            })),
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getStudentsByClass = async (
    id: string,
    schoolId: string
): Promise<StudentByClass | null> => {
    try {
        const data = await prisma.class.findFirst({
            where: { id, schoolId },
            select: {
                id: true,
                name: true,
                students: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        photo: true,
                        status: true,
                        studentStatus: true,
                        parents: true,
                    },
                },
            },
        });

        if (!data) return null;

        return {
            ...data,
            students: data?.students.map((student) => ({
                ...student,
                parents:
                    student.parents?.length > 0
                        ? student.parents
                              .map((parent) => parent.name)
                              .join(", ")
                        : "N/A",
            })),
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getStudentWithScores = async (
    id: string,
    schoolId: string
): Promise<StudentWithScore | null> => {
    try {
        const data = await prisma.student.findFirst({
            where: { id, schoolId },
            // include: { grade: true, class: true, parents: true },
        });

        if (!data) return null;

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
