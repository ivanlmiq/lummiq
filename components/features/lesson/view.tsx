"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getColumns } from "./column";
import type { Lesson } from "@prisma/client";

export function LessonView({
    data,
    schoolId,
}: {
    data: Lesson[];
    schoolId: string;
}) {
    return (
        <>
            <DataTable data={data} columns={getColumns(schoolId)} />
        </>
    );
}
