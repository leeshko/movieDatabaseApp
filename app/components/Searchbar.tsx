"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setQuery } from "@/redux/slices/searchSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Searchbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = useSelector((state: RootState) => state.search.query);

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      const currentQuery = searchParams.get("query") || "";

      if (inputValue.trim() !== currentQuery.trim()) {
        if (inputValue.trim()) {
          dispatch(setQuery(inputValue.trim()));
          params.set("query", inputValue.trim());
          params.set("page", "1");
        } else {
          dispatch(setQuery(""));
          params.delete("query");
          params.set("page", "1");
        }

        router.push(`/?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, router, searchParams, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <form className="flex justify-between px-5 max-w-6xl mx-auto bg-gray-100 rounded-md shadow-md">
      <div className="flex items-center w-full">
        <IconSearch className="h-5 w-5 text-gray-600 mr-3" />
        <input
          type="text"
          placeholder="Search keywords..."
          className="w-full h-14 rounded-md placeholder-gray-700 outline-none bg-gray-100 flex-1 text-gray-900"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      {inputValue && (
        <button
          type="reset"
          onClick={handleClear}
          className="cursor-pointer ml-3 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
      )}
    </form>
  );
};

export default Searchbar;
