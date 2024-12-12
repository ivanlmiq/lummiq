import React from "react";
import { MODULES } from "@/lib/constants";
import { ExamView } from "@/components/features/exams/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getExams } from "@/service/schemas/get-exams";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const data = await getExams(params.schoolId);

    return (
        <>
            <ListHeader module={MODULES.EXAMS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.EXAMS} />
            ) : (
                <ExamView data={data} schoolId={params.schoolId} />
            )}
        </>
    );
}
