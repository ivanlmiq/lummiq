import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { ExamForm } from "@/components/features/exams/form";
import { MODULES } from "@/lib/constants";

export default async function Page({
    params,
}: {
    params: Promise<PageParamsById>;
}) {
    const { id, schoolId } = await params;
    const IS_NEW = id === "new";
    const data = IS_NEW
        ? null
        : await prisma.exam.findUnique({ where: { id, schoolId } });

    return (
        <>
            <ListHeader
                module={MODULES.EXAMS}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <ExamForm initialData={data} />
        </>
    );
}
