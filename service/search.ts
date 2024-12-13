"use server";

import prisma from "@/lib/prisma";

export const searchByQuery = async (
    query: string | undefined,
    schoolId: string
) => {
    try {
        if (!query) return [];

        const result = (
            await Promise.all([
                prisma.student
                    .findMany({
                        where: {
                            schoolId: schoolId,
                            ...(query && {
                                OR: [
                                    {
                                        name: {
                                            contains: query,
                                            mode: "insensitive",
                                        },
                                    },
                                    {
                                        email: {
                                            contains: query,
                                            mode: "insensitive",
                                        },
                                    },
                                    {
                                        pin: {
                                            contains: query,
                                            mode: "insensitive",
                                        },
                                    },
                                ],
                            }),
                        },
                        include: { grade: { select: { level: true } } },
                        orderBy: { createdAt: "desc" },
                    })
                    .then((res) =>
                        res.map((student) => ({
                            ...student,
                            source: "students",
                        }))
                    ),
                prisma.parent
                    .findMany({
                        where: {
                            schoolId: schoolId,
                            ...(query && {
                                OR: [
                                    {
                                        name: {
                                            contains: query,
                                            mode: "insensitive",
                                        },
                                    },
                                    {
                                        email: {
                                            contains: query,
                                            mode: "insensitive",
                                        },
                                    },
                                ],
                            }),
                        },
                    })
                    .then((res) =>
                        res.map((parent) => ({
                            ...parent,
                            source: "parents",
                        }))
                    ),
                prisma.teacher
                    .findMany({
                        where: {
                            schoolId: schoolId,
                            ...(query && {
                                OR: [
                                    {
                                        name: {
                                            contains: query,
                                            mode: "insensitive",
                                        },
                                    },
                                    {
                                        email: {
                                            contains: query,
                                            mode: "insensitive",
                                        },
                                    },
                                ],
                            }),
                        },
                    })
                    .then((res) =>
                        res.map((teacher) => ({
                            ...teacher,
                            source: "teachers",
                        }))
                    ),
            ])
        ).flat();

        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
};
