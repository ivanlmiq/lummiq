import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import type { CommonCatalogue } from "@/types/catalogue/catalogue";

export type ParentColumn = {
    id: string;
    name: string;
    email: string;
    students: CommonCatalogue[];
    createdAt: Date;
};

export const getColumns = (schoolId: string): ColumnDef<ParentColumn>[] => {
    return [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        {
            accessorKey: "students",
            header: "Students",
            cell: ({ row }) => (
                <>
                    {row.original.students.map((student) => (
                        <Link
                            key={`student-${student.id}`}
                            href={`${STATIC_ROUTES.dashboard}/${schoolId}/${MODULES.STUDENTS}/${student.id}`}
                        >
                            <Button variant="link" color="primary">
                                {student.name}
                            </Button>
                        </Link>
                    ))}
                </>
            ),
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
                <CellAction data={row.original} module={MODULES.PARENTS} />
            ),
        },
    ];
};
