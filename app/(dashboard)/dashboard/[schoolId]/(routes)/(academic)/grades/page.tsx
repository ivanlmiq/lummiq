import React from "react";
import { MODULES } from "@/lib/constants";
import { GradesView } from "@/components/features/grade/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getGrades } from "@/service/schemas/get-grades";

export default async function Page({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { schoolId } = await params;
    const data = await getGrades(schoolId);

    return (
        <>
            <ListHeader module={MODULES.GRADES} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.GRADES} />
            ) : (
                <GradesView data={data} schoolId={schoolId} />
            )}
        </>
    );
}
