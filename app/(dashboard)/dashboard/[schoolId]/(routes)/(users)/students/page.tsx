import React from "react";
import { MODULES } from "@/lib/constants";
import { StudentView } from "@/components/features/student/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getStudents } from "@/service/schemas/get-students";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const data = await getStudents(params.schoolId);

    return (
        <>
            <ListHeader module={MODULES.STUDENTS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.STUDENTS} />
            ) : (
                <StudentView data={data} schoolId={params.schoolId} />
            )}
        </>
    );
}
