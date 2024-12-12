import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";
import { TeacherCell } from "./teacher-cell";

export type TeacherColumn = {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
};

export const columns: ColumnDef<TeacherColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <TeacherCell data={row.original} />,
    },
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
            <CellAction data={row.original} module={MODULES.TEACHERS} />
        ),
    },
];
