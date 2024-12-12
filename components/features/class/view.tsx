"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getColumns } from "./columns";
import type { Class } from "@prisma/client";

export function ClassView({
    data,
    schoolId,
}: {
    data: Class[];
    schoolId: string;
}) {
    return (
        <>
            <DataTable data={data} columns={getColumns(schoolId)} />
        </>
    );
}
