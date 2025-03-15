import React, { useState } from "react";
import { api } from "../../Services/ApiService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../../Components/Features/Search/SearchBar";
import SearchResults from "../../Components/Features/Search/SearchResults";
import { APIEndPoints } from "../../Services/UrlConstants";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const callSearchApi = async (search) => {
    try {
      setIsLoading(true);
      const response = await api.post(
        APIEndPoints.searchUsersByWord(search),
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

  const handleSearch = async () => {
    setSearchResults([]);
    setError("");

    if (!searchWord.trim()) {
      setSearchResults([]);
      return;
    }

    let searchData = await callSearchApi(searchWord);
    if (searchData?.error) return;

    if (searchData?.data && searchData.data.length > 0) {
      setSearchResults(searchData.data);
    } else {
      setError("No results found");
    }
  };

  const handleClearSearch = () => {
    setSearchWord("");
    setSearchResults([]);
    setError("");
  };

  const handleUserClick = (profileId) => {
    if (user.data._id === profileId) {
      navigate("/profile");
    } else if (profileId) {
      navigate(`/search/profile/${profileId}`);
    }
  };

  return (
    <>
      <SearchBar
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        onSearch={handleSearch}
        onclear={handleClearSearch}
      />
      <SearchResults
        isLoading={isLoading}
        searchResults={searchResults}
        error={error}
        searchWord={searchWord}
        onUserClick={handleUserClick}
      />
    </>
  );
};

export default Search;
