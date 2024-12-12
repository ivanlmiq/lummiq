import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { LessonForm } from "@/components/features/lesson/form";
import { MODULES } from "@/lib/constants";

export default async function Page({
    params: { id, schoolId },
}: {
    params: PageParams;
}) {
    const IS_NEW = id === "new";
    const data = IS_NEW
        ? null
        : await prisma.lesson.findUnique({ where: { id, schoolId } });

    return (
        <>
            <ListHeader
                module={MODULES.LESSONS}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <LessonForm initialData={data} />
        </>
    );
}
