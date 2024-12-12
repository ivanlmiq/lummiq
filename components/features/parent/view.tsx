"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getColumns, type ParentColumn } from "./columns";

export function ParentView({
    data,
    schoolId,
}: {
    data: ParentColumn[];
    schoolId: string;
}) {
    return (
        <>
            <DataTable data={data} columns={getColumns(schoolId)} />
        </>
    );
}
