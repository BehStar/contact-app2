import React, { useState, createContext, useContext } from "react";

export const SearchContext = createContext(false);

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const { search, setSearch } = useContext(SearchContext);
  return { search, setSearch };
};
