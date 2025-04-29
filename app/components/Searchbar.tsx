"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch.trim()) {
      params.set("query", debouncedSearch.trim());
      params.set("page", "1");
    } else {
      params.delete("query");
      params.set("page", "1");
    }

    router.push(`/?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  const handleClearSearch = () => {
    setSearch("");
  };

  return (
    <form className="flex justify-between px-5 max-w-6xl mx-auto bg-gray-100 rounded-md shadow-md">
      <div className="flex items-center w-full">
        <IconSearch className="h-5 w-5 text-gray-600 mr-3" />
        <input
          type="text"
          placeholder="Search keywords..."
          className="w-full h-14 rounded-md placeholder-gray-700 outline-none bg-gray-100 flex-1 text-gray-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search && (
        <button
          type="reset"
          onClick={handleClearSearch}
          className="cursor-pointer ml-3 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
      )}
    </form>
  );
};

export default Searchbar;
