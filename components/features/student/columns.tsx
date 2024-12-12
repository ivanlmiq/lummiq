import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";
import { STATIC_ROUTES } from "@/lib/routeConfig";

export type StudentColumn = {
    id: string;
    name: string;
    email: string;
    grade: string;
    parents: string;
    dob: string;
    createdAt: Date;
};

export const getColumns = (schoolId: string): ColumnDef<StudentColumn>[] => {
    return [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "grade", header: "Grade" },
        { accessorKey: "parents", header: "Parents" },
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
                    module={MODULES.STUDENTS}
                    buttonVariant="green"
                    customActions={[
                        {
                            label: "Open score",
                            href: `${STATIC_ROUTES.dashboard}/${schoolId}/${MODULES.STUDENTS}/${row.original.id}/${MODULES.SCORE}`,
                        },
                    ]}
                />
            ),
        },
    ];
};
