"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getColumns, type GradeColumn } from "./columns";

export function GradesView({ data, schoolId }: { data: GradeColumn[]; schoolId: string }) {
    return (
        <>
            <DataTable data={data} columns={getColumns(schoolId)} />
        </>
    );
}
