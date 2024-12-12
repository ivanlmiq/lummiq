import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";

export type ClassColumn = {
    id: string;
    name: string;
    day: string;
    createdAt: Date;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getColumns = (schoolId: string): ColumnDef<ClassColumn>[] => {
    return [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "day", header: "Day" },
        {
            accessorKey: "createdAt",
            header: "Created at",
            cell: ({ row }) =>
                format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <CellAction data={row.original} module={MODULES.LESSONS} />
            ),
        },
    ];
};
