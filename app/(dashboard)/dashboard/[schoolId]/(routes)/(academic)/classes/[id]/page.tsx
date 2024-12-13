import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { ClassForm } from "@/components/features/class/form";
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
        : await prisma.class.findUnique({ where: { id, schoolId } });

    return (
        <>
            <ListHeader
                module={MODULES.CLASSES}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <ClassForm initialData={data} />
        </>
    );
}
