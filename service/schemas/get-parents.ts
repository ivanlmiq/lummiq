"use server";

import prisma from "@/lib/prisma";
import type { ParentColumn } from "@/components/features/parent/columns";

export const getParents = async (schoolId: string): Promise<ParentColumn[]> => {
    try {
        const parents = schoolId
            ? await prisma.parent.findMany({
                  where: { schoolId },
                  include: { students: true },
                  orderBy: { createdAt: "desc" },
              })
            : [];

        const data = parents.map((parent) => ({
            ...parent,
            students:
                parent.students?.length > 0
                    ? parent.students.map((student) => {
                          return {
                              id: student.id,
                              name: student.name,
                          };
                      })
                    : [],
        }));

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
