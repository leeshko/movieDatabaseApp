"use client";
import React, { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

const Searchbar = () => {
    const [search, setSearch] = useState('');
  
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
            onClick={() => setSearch('')}
            className="cursor-pointer ml-3 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        )}

      </form>
    );
  };
  
  export default Searchbar;