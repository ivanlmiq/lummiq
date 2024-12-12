"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import type { Teacher } from "@prisma/client";

export function TeacherView({ data }: { data: Teacher[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} />
        </>
    );
}
