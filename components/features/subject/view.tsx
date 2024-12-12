"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getColumns, SubjectColumn } from "./column";

export function SubjectView({
    data,
    schoolId,
}: {
    data: SubjectColumn[];
    schoolId: string;
}) {
    return (
        <>
            <DataTable data={data} columns={getColumns(schoolId)} />
        </>
    );
}
