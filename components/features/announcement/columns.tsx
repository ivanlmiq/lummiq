import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";

export type AnnouncementColumn = {
    id: string;
    title: string;
    content: string;
    date: string;
    createdAt: Date;
};

export const columns: ColumnDef<AnnouncementColumn>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "content", header: "Content" },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
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
            <CellAction data={row.original} module={MODULES.ANNOUNCEMENTS} />
        ),
    },
];
