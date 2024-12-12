"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns, type AnnouncementColumn } from "./columns";

export function AnnouncementView({ data }: { data: AnnouncementColumn[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} />
        </>
    );
}
