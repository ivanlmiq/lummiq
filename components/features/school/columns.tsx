import { CellAction } from '@/components/ui/custom/cell-action';
import { GENERIC_DATE_FORMAT, MODULES } from '@/lib/constants';
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns';
import React from 'react'

export type SchoolColumn = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;

}

export const columns: ColumnDef<SchoolColumn>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }) =>
            format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <CellAction data={row.original} module={MODULES.SCHOOL} />
        ),
    },
]
