"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getColumns } from "./column";
import type { Exam } from "@prisma/client";

export function ExamView({
    data,
    schoolId,
}: {
    data: Exam[];
    schoolId: string;
}) {
    return (
        <>
            <DataTable data={data} columns={getColumns(schoolId)} />
        </>
    );
}
