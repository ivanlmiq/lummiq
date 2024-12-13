import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { TeacherForm } from "@/components/features/teacher/form";
import { getCustomFields } from "@/service/schemas/get-custom-fields";
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
        : await prisma.teacher.findUnique({ where: { id, schoolId } });

    const customFields = await getCustomFields(schoolId, "teacher");

    return (
        <>
            <ListHeader
                module={MODULES.TEACHERS}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <TeacherForm initialData={data} customFields={customFields} />
        </>
    );
}
