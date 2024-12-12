"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { GENERIC_DATE_FORMAT } from "@/lib/constants";
import { School, Square, Timer, User } from "lucide-react";
import type { SearchStudent } from "@/types/schemas/students";

type DataTableProps = {
  columns: ColumnDef<SearchStudent>[];
  data: SearchStudent[];
};

export function DataTableCollapsible({ columns, data }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  onClick={row.getToggleExpandedHandler()}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>
                      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all ease-in-out duration-300 hover:shadow-lg">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                            <School size={18} color="gray" />
                            <strong>School ID:</strong> <span className="text-gray-600">{row.original.schoolId}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            {row.original.genre === "MALE" ? <User size={18} color="blue" /> : <User size={18} color="pink" />}
                            <strong>Genre:</strong> <span className="text-gray-600">{row.original.genre}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Square size={18} color={
                              row.original.studentStatus === "ACTIVE" ? 'green' :
                                row.original.studentStatus === "SUSPENDED" ? 'yellow' :
                                  row.original.studentStatus === "INACTIVE" ? 'red' :
                                    'blue'} />
                            <strong>Status:</strong> <span className="text-gray-600">{row.original.studentStatus}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <Timer size={18} color="gray" />
                            <strong>Created At:</strong> <span className="text-gray-600">{format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT)}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <Timer size={18} color="gray" />
                            <strong>Update At:</strong> <span className="text-gray-600">{format(new Date(row.original.updatedAt), GENERIC_DATE_FORMAT)}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>

                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
