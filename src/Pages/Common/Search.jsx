import React, { useEffect, useRef, useState } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { api } from "../../Services/ApiService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const { user } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(()=>{
    if(searchWord === ""){
      setSearchResults([]);
      setError("");
      inputRef.current.focus();
    }
  },[searchWord])

  const callSearchApi = async (search) => {
    try {
      setIsLoading(true);
      const response = await api.post(
        `/users/search-users?query=${search}`,
        {},
        { withCredentials: true }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong. Please try again!");
      return { error: true };
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchResults([]);
    setError("");
    if (!searchWord.trim()) return;

    let searchData = await callSearchApi(searchWord);
    if (searchData?.error) {
      return;
    }

    if (searchData?.data && searchData.data.length > 0) {
      setSearchResults(searchData.data);
    }
  };

  const handleClose = async() => {
    setSearchWord("");
    setSearchResults([]);
    setError("")
  }

  const handleUserclick = (profileId) =>{
    if(user.data._id === profileId){
      navigate("/profile")
    }
    else if(profileId){
      navigate(`/search/profile/${profileId}`);
    }
  }

  const isSearchDisabled = !searchWord.trim();

  return (
    <>
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
              onClick={handleClose}
              className="absolute right-8 sm:right-10 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
            >
              <X />
            </button>
          )}
          <button
            type="submit"
            disabled={ isSearchDisabled}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2`}
          >
            <SearchIcon className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 ${isSearchDisabled ? "cursor-not-allowed" : "cursor-pointer"}`} />
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-items-start w-full px-4">
        {isLoading ? (
          <p className="text-gray-900 dark:text-white">
            Searching for {searchWord}...
          </p>
        ) : searchResults.length > 0 ? (
          searchResults.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserclick(user._id)}
              className="flex items-center cursor-pointer gap-3 p-2 border-b border-gray-300 dark:border-gray-600"
            >
              <img
                src={user.profileImage ||  "assets/default_profile.webp"}
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
        ) : searchWord && error? (
          <p className="text-gray-900 dark:text-white">
            No results found for "{searchWord}"
          </p>
        ) : null}
      </div>
    </>
  );
};

export default Search;
