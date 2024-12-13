import React from "react";
import { StudentView } from "@/components/features/search/students/view";
import { ParentOrTeacherView } from "@/components/features/search/view";
import { searchByQuery } from "@/service/search";
import type { SearchStudent } from "@/types/schemas/students";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<PageParams>;
    searchParams: Promise<QueryPageParams>;
}) {
    const { schoolId } = await params;
    const { query } = await searchParams;

    const data = schoolId ? await searchByQuery(query, schoolId) : [];

    const students = data.filter((item) => item.source === "students");
    const teachersOrParents = data.filter(
        (item) => item.source === "teachers" || item.source === "parents"
    );

    return (
        <>
            {students.length > 0 && (
                <StudentView data={students as SearchStudent[]} />
            )}
            {teachersOrParents.length > 0 && (
                <ParentOrTeacherView data={teachersOrParents} />
            )}
        </>
    );
}
