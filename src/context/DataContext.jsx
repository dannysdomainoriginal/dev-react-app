import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosFetch, useWindowSize } from "../hooks";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [posts, setPosts, fetchError, isLoading] = useAxiosFetch("/posts");

  useEffect(() => {
    const s = search.trim();
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(s.toLowerCase()) ||
        post.title.toLowerCase().includes(s.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
        navigate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
