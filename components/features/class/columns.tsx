import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";
import { STATIC_ROUTES } from "@/lib/routeConfig";

export type ClassColumn = {
    id: string;
    name: string;
    capacity: number;
    createdAt: Date;
};

export const getColumns = (schoolId: string): ColumnDef<ClassColumn>[] => {
    return [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "capacity", header: "Capacity" },
        {
            accessorKey: "createdAt",
            header: "Created at",
            cell: ({ row }) =>
                format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <CellAction
                    data={row.original}
                    module={MODULES.CLASSES}
                    customActions={[
                        {
                            label: "See students",
                            href: `${STATIC_ROUTES.dashboard}/${schoolId}/${MODULES.CLASSES}/${row.original.id}/${MODULES.STUDENTS}`,
                        },
                    ]}
                />
            ),
        },
    ];
};
