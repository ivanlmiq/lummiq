"use client";

import React from "react";
import { columns } from "./columns";
import { DataTableCollapsible } from "@/components/ui/custom/search/data-table-collapsible";
import type { SearchStudent } from "@/types/schemas/students";

export function StudentView({ data }: { data: SearchStudent[] }) {
  return (
    <>
      <DataTableCollapsible data={data} columns={columns} />
    </>
  );
}
