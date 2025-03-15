import React, { useEffect, useRef, useState } from "react";
import { X, Search as SearchIcon } from "lucide-react";

const SearchBar = ({ searchWord, setSearchWord, onSearch, onclear }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (searchWord === "") {
      onclear();
      inputRef.current.focus();
    }
  }, [searchWord]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
      <form className="relative w-full max-w-md" onSubmit={handleSearch}>
        <input
          type="text"
          className="py-1 w-full pl-4 pr-10 sm:py-2 bg-gray-200 text-gray-700 
          dark:bg-gray-700 dark:text-white rounded-lg focus:bg-white dark:focus:bg-gray-800
          focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-blue-500"
          value={searchWord}
          ref={inputRef}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search..."
        />
        {searchWord && (
          <button
            type="button"
            onClick={onclear}
            className="absolute right-8 sm:right-10 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
          >
            <X />
          </button>
        )}
        <button
          type="submit"
          disabled={!searchWord.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <SearchIcon
            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 ${
              !searchWord.trim() ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
