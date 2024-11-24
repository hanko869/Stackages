"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, Calendar, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { format } from "date-fns";

interface Generation {
  id: string;
  slug: string;
  created_at: string;
  model: string;
  type: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
}

interface UserGenerationsProps {
  generations: Generation[];
  generationType: "llama" | "gpt" | "vision" | "claude" | "grok";
}

export function UserGenerations({
  generations,
  generationType,
}: UserGenerationsProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const debouncedFilterValue = useDebounce(filterValue, 300);

  const columns: ColumnDef<Generation>[] = React.useMemo(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("title") || "Untitled"}
          </div>
        ),
      },
      {
        accessorKey: "subtitle",
        header: "Subtitle",
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">
            {row.getValue("subtitle") || "No subtitle"}
          </div>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => (
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "model",
        header: "Model",
        cell: ({ row }) => (
          <div className="flex items-center whitespace-nowrap">
            <Bot className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Badge className="bg-black text-white hover:bg-black/80 text-xs">
              {row.getValue("model")}
            </Badge>
          </div>
        ),
      },
    ],
    []
  );

  const filteredGenerations = React.useMemo(() => {
    return generations.filter(
      (gen) =>
        gen.title?.toLowerCase().includes(debouncedFilterValue.toLowerCase()) ||
        gen.subtitle
          ?.toLowerCase()
          .includes(debouncedFilterValue.toLowerCase()) ||
        gen.model.toLowerCase().includes(debouncedFilterValue.toLowerCase())
    );
  }, [generations, debouncedFilterValue]);

  const table = useReactTable({
    data: filteredGenerations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const { rows } = table.getRowModel();
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 20 });

  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const lastRowRef = React.useRef<HTMLTableRowElement | null>(null);

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleRange((prev) => ({
            start: prev.start,
            end: Math.min(prev.end + 20, rows.length),
          }));
        }
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, [rows.length]);

  React.useEffect(() => {
    if (lastRowRef.current && observerRef.current) {
      observerRef.current.observe(lastRowRef.current);
    }
    return () => {
      if (lastRowRef.current && observerRef.current) {
        observerRef.current.unobserve(lastRowRef.current);
      }
    };
  }, [visibleRange]);

  React.useEffect(() => {
    setVisibleRange({ start: 0, end: 20 }); // Reset visible range when filter changes
  }, [debouncedFilterValue]);

  const handleFilterChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(event.target.value);
    },
    []
  );

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Your Generations</h2>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter generations..."
          value={filterValue}
          onChange={handleFilterChange}
          className="max-w-sm"
        />
      </div>
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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(visibleRange.start, visibleRange.end)
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    ref={
                      index === visibleRange.end - visibleRange.start - 1
                        ? lastRowRef
                        : null
                    }
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() =>
                      router.push(
                        `/apps/${generationType}/${row.original.slug}`
                      )
                    }
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
                ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
