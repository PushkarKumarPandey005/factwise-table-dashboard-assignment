import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  // ====================Search handler - triggered by button click=================================
  function handleSearchClick() {
    onSearch(query);
  }

  //================================= Allow search on Enter key press too====================================
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        className="border px-3 py-2 rounded w-full text-sm bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearchClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded font-bold flex items-center justify-center gap-2 transition text-sm whitespace-nowrap w-full sm:w-auto"
      >
        <FiSearch size={18} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
}

export default Search;
