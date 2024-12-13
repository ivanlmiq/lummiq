import React from "react";
import { MODULES } from "@/lib/constants";
import { ExamView } from "@/components/features/exams/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getExams } from "@/service/schemas/get-exams";

export default async function Page({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { schoolId } = await params;
    const data = await getExams(schoolId);

    return (
        <>
            <ListHeader module={MODULES.EXAMS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.EXAMS} />
            ) : (
                <ExamView data={data} schoolId={schoolId} />
            )}
        </>
    );
}
