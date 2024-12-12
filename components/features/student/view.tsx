"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getColumns, type StudentColumn } from "./columns";

export function StudentView({
    data,
    schoolId,
}: {
    data: StudentColumn[];
    schoolId: string;
}) {
    return (
        <>
            <DataTable data={data} columns={getColumns(schoolId)} />
        </>
    );
}
