import React from "react";

const SearchResults = ({ isLoading, searchResults, error, onUserClick, searchWord }) => {
  return (
    <div className="flex flex-col justify-items-start w-full px-4">
      {isLoading ? (
        <p className="text-gray-900 dark:text-white">
          Searching for {searchWord}...
        </p>
      ) : searchResults.length > 0 ? (
        searchResults.map((user) => (
          <div
            key={user._id}
            onClick={() => onUserClick(user._id)}
            className="flex items-center cursor-pointer gap-3 p-2 border-b border-gray-300 dark:border-gray-600"
          >
            <img
              src={user.profileImage || "assets/default_profile.webp"}
              alt={user.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-gray-900 dark:text-white font-semibold">
                {user.username}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {user.email}
              </p>
            </div>
          </div>
        ))
      ) : searchWord && error ? (
        <p className="text-gray-900 dark:text-white">
          No results found for "{searchWord}"
        </p>
      ) : null}
    </div>
  );
};

export default SearchResults;