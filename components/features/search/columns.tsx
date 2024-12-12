import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { GENERIC_DATE_FORMAT } from "@/lib/constants";

export type ParentOrTeacherColumn = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export const columns: ColumnDef<ParentOrTeacherColumn>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT),
  },

];
