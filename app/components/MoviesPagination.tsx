"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setPage } from "@/redux/slices/searchSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const MoviesPagination = ({ totalPages }: { totalPages: number }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = useSelector((state: RootState) => state.search.page);

  const [inputPage, setInputPage] = useState(page.toString());

  useEffect(() => {
    setInputPage(page.toString());
  }, [page]);

  const updateUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      dispatch(setPage(newPage));
      updateUrl(newPage);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      dispatch(setPage(newPage));
      updateUrl(newPage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPage = parseInt(inputPage, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      updateUrl(newPage);
    } else {
      setInputPage(page.toString());
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={handlePrev}
        disabled={page <= 1}
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
        disabled={page >= totalPages}
        className="cursor-pointer px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default MoviesPagination;
