import React from "react";
import { MODULES } from "@/lib/constants";
import { SubjectView } from "@/components/features/subject/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getSubjects } from "@/service/schemas/get-subjects";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const data = await getSubjects(params.schoolId);

    return (
        <>
            <ListHeader module={MODULES.SUBJECTS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.SUBJECTS} />
            ) : (
                <SubjectView data={data} schoolId={params.schoolId} />
            )}
        </>
    );
}
