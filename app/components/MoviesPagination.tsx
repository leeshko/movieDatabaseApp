"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
};

const MoviesPagination = ({ currentPage, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputPage, setInputPage] = useState(currentPage.toString());

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const goToPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  }, [router, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      goToPage(pageNumber);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const handlePrev = useCallback(() => {
    goToPage(Math.max(currentPage - 1, 1));
  }, [currentPage, goToPage]);

  const handleNext = useCallback(() => {
    goToPage(Math.min(currentPage + 1, totalPages));
  }, [currentPage, totalPages, goToPage]);

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className="cursor-pointer px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          className="w-16 text-center border border-gray-400 rounded"
          placeholder="Page"
        />
        <span>/ {totalPages}</span>
      </form>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="cursor-pointer px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default MoviesPagination;
