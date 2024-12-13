import React from "react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { ListHeader } from "@/components/list-page-header/header";
import { AnnouncementForm } from "@/components/features/announcement/form";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";

export default async function Page({
    params,
}: {
    params: Promise<PageParamsById>;
}) {
    const { id, schoolId } = await params;
    const IS_NEW = id === "new";
    const data = IS_NEW
        ? null
        : await prisma.announcement.findUnique({ where: { id, schoolId } });

    return (
        <>
            <ListHeader
                module={MODULES.CLASSES}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <AnnouncementForm
                initialData={
                    data && {
                        ...data,
                        date: format(data.date, GENERIC_DATE_FORMAT),
                    }
                }
            />
        </>
    );
}
