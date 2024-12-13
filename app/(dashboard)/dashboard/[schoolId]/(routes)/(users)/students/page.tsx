import React from "react";
import { MODULES } from "@/lib/constants";
import { StudentView } from "@/components/features/student/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getStudents } from "@/service/schemas/get-students";

export default async function Page({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { schoolId } = await params;
    const data = await getStudents(schoolId);

    return (
        <>
            <ListHeader module={MODULES.STUDENTS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.STUDENTS} />
            ) : (
                <StudentView data={data} schoolId={schoolId} />
            )}
        </>
    );
}
