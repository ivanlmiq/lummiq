"use client";

import React from "react";
import { columns, ParentOrTeacherColumn } from "./columns";
import { DataTable } from "@/components/data-table/data-table";

export function ParentOrTeacherView({
  data
}: {
  data: ParentOrTeacherColumn[];
}) {
  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
}
