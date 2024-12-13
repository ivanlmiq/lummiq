import React from "react";
import { MODULES } from "@/lib/constants";
import { LessonView } from "@/components/features/lesson/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getLessons } from "@/service/schemas/get-lessons";

export default async function Page({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { schoolId } = await params;
    const data = await getLessons(schoolId);

    return (
        <>
            <ListHeader module={MODULES.LESSONS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.LESSONS} />
            ) : (
                <LessonView data={data} schoolId={schoolId} />
            )}
        </>
    );
}
