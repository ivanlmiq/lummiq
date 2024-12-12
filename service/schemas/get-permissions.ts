"use server";

import prisma from "@/lib/prisma";
import { TeacherRole } from "@prisma/client";
import type { PermissionColumn } from "@/components/features/permissions/column";

type Props = { schoolId: string; role: TeacherRole; teacherId: string };

export const getPermissions = async ({
    schoolId,
    role,
    teacherId,
}: Props): Promise<PermissionColumn[]> => {
    try {
        if (role === "PRINCIPAL") {
            const allPermissions: PermissionColumn[] = [
                {
                    id: "all-permissions",
                    action: "ALL",
                    role: "PRINCIPAL",
                    schema: "ALL",
                },
            ];

            return allPermissions;
        }

        const permissions = await prisma.teacherPermission.findMany({
            where: {
                OR: [{ schoolId, role }, { teacherId }],
            },
        });

        return permissions;
    } catch (error) {
        console.error("Error getting permissions", error);
        return [];
    }
};
