import React from "react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";
import { AnnouncementView } from "@/components/features/announcement/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const data = params.schoolId
        ? await prisma.announcement.findMany({
              where: { schoolId: params.schoolId },
              orderBy: { createdAt: "desc" },
          })
        : [];

    return (
        <>
            <ListHeader module={MODULES.ANNOUNCEMENTS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.ANNOUNCEMENTS} />
            ) : (
                <AnnouncementView
                    data={data.map((row) => ({
                        ...row,
                        date: format(row.date, GENERIC_DATE_FORMAT),
                    }))}
                />
            )}
        </>
    );
}
