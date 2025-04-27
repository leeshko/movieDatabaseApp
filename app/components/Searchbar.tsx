"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (search.trim()) {
        params.set("query", search.trim());
      } else {
        params.delete("query");
      }

      const page = searchParams.get("page");
      if (page) {
        params.set("page", page);
      } else {
        params.set("page", "1");
      }

      router.push(`/?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, router, searchParams]);

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
          onClick={() => setSearch("")}
          className="cursor-pointer ml-3 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
      )}
    </form>
  );
};

export default Searchbar;
