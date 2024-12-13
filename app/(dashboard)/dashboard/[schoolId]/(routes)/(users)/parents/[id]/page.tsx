import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { ParentForm } from "@/components/features/parent/form";
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
        : await prisma.parent.findUnique({ where: { id, schoolId } });

    const customFields = await getCustomFields(schoolId, "parent");

    return (
        <>
            <ListHeader
                module={MODULES.PARENTS}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <ParentForm initialData={data} customFields={customFields} />
        </>
    );
}
