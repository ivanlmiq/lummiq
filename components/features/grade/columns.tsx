import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";
import { STATIC_ROUTES } from "@/lib/routeConfig";

export type GradeColumn = {
    id: string;
    level: string;
    classes: string;
    createdAt: Date;
};

export const getColumns = (schoolId: string): ColumnDef<GradeColumn>[] => {
    return [
        { accessorKey: "level", header: "Level" },
        { accessorKey: "classes", header: "Class" },
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
                    module={MODULES.GRADES}
                    customActions={[
                        {
                            label: "See students",
                            href: `${STATIC_ROUTES.dashboard}/${schoolId}/${MODULES.GRADES}/${row.original.id}/${MODULES.STUDENTS}`,
                        },
                    ]}
                />
            ),
        },
    ];
};
