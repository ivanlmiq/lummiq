import React from "react";
import prisma from "@/lib/prisma";
import { MODULES } from "@/lib/constants";
import { TeacherView } from "@/components/features/teacher/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";

export default async function Page({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { schoolId } = await params;
    const data = schoolId
        ? await prisma.teacher.findMany({
              where: { schoolId },
              orderBy: { createdAt: "desc" },
          })
        : [];

    return (
        <>
            <ListHeader module={MODULES.TEACHERS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.TEACHERS} />
            ) : (
                <TeacherView data={data} />
            )}
        </>
    );
}
