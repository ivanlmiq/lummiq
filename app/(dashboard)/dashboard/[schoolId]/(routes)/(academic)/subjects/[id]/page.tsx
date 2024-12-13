import React from "react";
import { ListHeader } from "@/components/list-page-header/header";
import { SubjectForm } from "@/components/features/subject/form";
import { MODULES } from "@/lib/constants";
import { getSubject } from "@/service/schemas/get-subjects";

export default async function Page({
    params,
}: {
    params: Promise<PageParamsById>;
}) {
    const { id, schoolId } = await params;
    const IS_NEW = id === "new";
    const data = IS_NEW ? null : await getSubject(id, schoolId);

    return (
        <>
            <ListHeader
                module={MODULES.SUBJECTS}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <SubjectForm initialData={data} />
        </>
    );
}
