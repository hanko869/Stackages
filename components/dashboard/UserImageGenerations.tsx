"use client";

import { Heading } from "@/components/dashboard/Heading";
import { Paragraph } from "@/components/dashboard/Paragraph";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface Generation {
  id: string;
  created_at: string;
  input_data: {
    prompt?: string;
    ideaDescription?: string;
    negativePrompt?: string;
    toolPath?: string;
  };
  output_data: string;
  type: string;
}

interface UserGenerationsProps {
  generations: Generation[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd HH:mm:ss");
}

export function UserGenerations({ generations }: UserGenerationsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 24;

  const paginatedGenerations = generations.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  // Reset selectedImageIndex when page changes
  useEffect(() => {
    setSelectedImageIndex(null);
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") {
          setSelectedImageIndex((prev) => {
            if (prev === null) return paginatedGenerations.length - 1;
            return prev > 0 ? prev - 1 : paginatedGenerations.length - 1;
          });
        } else if (e.key === "ArrowRight") {
          setSelectedImageIndex((prev) => {
            if (prev === null) return 0;
            return prev < paginatedGenerations.length - 1 ? prev + 1 : 0;
          });
        } else if (e.key === "Escape") {
          setSelectedImageIndex(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, paginatedGenerations]);

  const generationTitle =
    generations[0]?.type.split("/").pop()?.toUpperCase() || "Image";

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedImageIndex(null);
  };

  return (
    <div className="space-y-8 mx-auto pb-20">
      <Heading className="text-2xl font-bold">
        Your {generationTitle} Generations
      </Heading>
      {generations.length === 0 ? (
        <Paragraph>You haven't created any image generations yet.</Paragraph>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedGenerations.map((gen, index) => (
              <div
                key={gen.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={gen.output_data}
                      alt={gen.input_data.prompt}
                      className="w-full h-64 object-cover cursor-pointer"
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl bg-transparent border-none shadow-none p-0">
                    {selectedImageIndex !== null && (
                      <div className="relative">
                        <img
                          src={
                            paginatedGenerations[selectedImageIndex].output_data
                          }
                          alt="Generated image"
                          className="w-full h-auto rounded-lg"
                        />
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) => {
                              if (prev === null)
                                return paginatedGenerations.length - 1;
                              return prev > 0
                                ? prev - 1
                                : paginatedGenerations.length - 1;
                            })
                          }
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-lg p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
                        >
                          <ChevronLeft className="h-6 w-6 text-gray-600" />
                        </button>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) => {
                              if (prev === null) return 0;
                              return prev < paginatedGenerations.length - 1
                                ? prev + 1
                                : 0;
                            })
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-lg p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
                        >
                          <ChevronRight className="h-6 w-6 text-gray-600" />
                        </button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <div className="p-4 space-y-2">
                  <p className="font-semibold text-sm text-gray-600">
                    {formatDate(gen.created_at)}
                  </p>
                  {Object.entries(gen.input_data).map(
                    ([key, value]) =>
                      value &&
                      key !== "toolPath" && (
                        <div key={key}>
                          <p className="font-medium">
                            {key.charAt(0).toUpperCase() +
                              key.slice(1).replace(/([A-Z])/g, " $1")}
                            :
                          </p>
                          <p className="text-sm text-gray-700">{value}</p>
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
          {generations.length > imagesPerPage && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm"
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {[...Array(Math.ceil(generations.length / imagesPerPage))].map(
                (_, i) => {
                  const pageNumber = i + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber ===
                      Math.ceil(generations.length / imagesPerPage) ||
                    (pageNumber >= currentPage - 2 &&
                      pageNumber <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={currentPage === pageNumber}
                        className={`px-3 py-2 rounded ${
                          currentPage === pageNumber
                            ? "bg-primary text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 3 ||
                    pageNumber === currentPage + 3
                  ) {
                    return <span key={i}>...</span>;
                  }
                  return null;
                }
              )}
              <button
                onClick={() =>
                  handlePageChange(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(generations.length / imagesPerPage)
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(generations.length / imagesPerPage)
                }
                className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(generations.length / imagesPerPage)
                  )
                }
                disabled={
                  currentPage === Math.ceil(generations.length / imagesPerPage)
                }
                className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm"
              >
                Last
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
