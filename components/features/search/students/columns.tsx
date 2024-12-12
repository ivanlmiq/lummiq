import type { SearchStudent } from "@/types/schemas/students";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<SearchStudent>[] = [
  { accessorKey: "pin", header: "PIN" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    header: "Grade",
    accessorKey: "grade",
  },

];
