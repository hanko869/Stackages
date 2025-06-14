"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface YourFilesProps {
  recordings: any[];
}

const YourFiles: React.FC<YourFilesProps> = ({ recordings }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRecording, setSelectedRecording] = useState<any>(null);
  const itemsPerPage = 5;

  const handleDelete = async (recordingId: string) => {
    const res = await fetch("/api/audio/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordingId }),
    });
    if (res.ok) {
      setSelectedRecording(null);
      window.location.reload();
    }
  };

  const sortedRecordings = [...recordings].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const totalPages = Math.ceil(sortedRecordings.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentRecordings = sortedRecordings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4">
      <div className="space-y-1 mb-4 mt-4">
        <h4 className="text-sm font-medium leading-none">Your recordings</h4>
        <p className="text-sm text-muted-foreground">
          Find a list with your previous recordings below.
        </p>
      </div>

      {recordings && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="text-center">Uploaded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecordings.map((recording: any) => (
                <TableRow key={recording.id}>
                  <TableCell>
                    <a
                      href={`/audio/${recording.id}`}
                      className="text-primary hover:underline"
                    >
                      {recording.title ?? "Untitled"}
                    </a>
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-500">
                    {formatDistanceToNow(new Date(recording.created_at))} ago
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="hover:bg-primary/80 hover:text-white flex items-center space-x-1"
                          variant="ghost"
                          color="red"
                          onClick={() => setSelectedRecording(recording)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Confirm deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this recording? This
                          action cannot be undone.
                        </DialogDescription>
                        <DialogFooter>
                          <Button
                            className="bg-red-500 text-white hover:bg-red-400"
                            onClick={() => handleDelete(selectedRecording.id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="hover:bg-primary/80 hover:text-white"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    className="hover:bg-primary/80 hover:text-white"
                    onClick={() => handlePageChange(i + 1)}
                    isActive={i + 1 === currentPage}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="hover:bg-primary/80 hover:text-white"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default YourFiles;
