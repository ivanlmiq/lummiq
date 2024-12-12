import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";
import type { CommonCatalogue } from "@/types/catalogue/catalogue";

export type SubjectColumn = {
    id: string;
    name: string;
    code: string;
    type: string;
    lessons: CommonCatalogue[];
    createdAt: Date;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getColumns = (schoolId: string): ColumnDef<SubjectColumn>[] => {
    return [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "code", header: "Code" },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                return (
                    <span className="capitalize">
                        {row.original.type.toLowerCase()}
                    </span>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: "Created at",
            cell: ({ row }) =>
                format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <CellAction data={row.original} module={MODULES.SUBJECTS} />
            ),
        },
    ];
};
