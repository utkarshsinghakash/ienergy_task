import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MovieContext.Provider
      value={{ movies, setMovies, searchQuery, setSearchQuery }}
    >
      {children}
    </MovieContext.Provider>
  );
};
