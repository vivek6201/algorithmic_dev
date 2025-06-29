'use client';

import { useAdminStore } from '@/store/adminStore';
import { Admin } from '@repo/db';
import { TanstackTable } from '@repo/ui';
import { Input } from '@repo/ui/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';
import { useEffect, useState } from 'react';

interface DataTableProps<TValue> {
  columns: TanstackTable.ColumnDef<Admin, TValue>[];
}

export default function AdminTable<TValue>({ columns }: DataTableProps<TValue>) {
  const [sorting, setSorting] = useState<TanstackTable.SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TanstackTable.ColumnFiltersState>([]);

  const { admins: data, fetchUsers, loading, error } = useAdminStore();

  useEffect(() => {
    if (data) return;
    fetchUsers();
  }, [data, fetchUsers]);

  const table = TanstackTable.useReactTable({
    data: !loading && data ? data : [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: TanstackTable.getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: TanstackTable.getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : TanstackTable.flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!loading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {TanstackTable.flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Fetching Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
