import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { GradeForm } from "@/components/features/grade/form";
import { MODULES } from "@/lib/constants";

export default async function Page({
    params: { id, schoolId },
}: {
    params: PageParams;
}) {
    const IS_NEW = id === "new";
    const data = IS_NEW
        ? null
        : await prisma.grade.findUnique({ where: { id, schoolId } });

    const categories = await prisma.gradeCategory.findMany({
        where: { schoolId },
        orderBy: { name: "asc" },
    });

    return (
        <>
            <ListHeader
                module={MODULES.GRADES}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <GradeForm initialData={data} categories={categories} />
        </>
    );
}
