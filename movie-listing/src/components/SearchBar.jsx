import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { fetchMovies } from "../api/omdbApi";
import { TextField, List, ListItem, Paper, Box } from "@mui/material";
import debounce from "lodash/debounce";

const SearchBar = () => {
  const { setMovies, searchQuery, setSearchQuery } = useContext(MovieContext);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]); // ✅ Clear suggestions if input is empty
      return;
    }

    const fetchData = async () => {
      const data = await fetchMovies(searchQuery);
      setSuggestions(data?.Search || []);
    };

    const debouncedFetch = debounce(fetchData, 500);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [searchQuery]);

  const handleSuggestionClick = (movieTitle) => {
    setSearchQuery(movieTitle); // ✅ Set search input value
    setSuggestions([]); // ✅ Clear suggestions immediately
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="🔍 Search for Movies"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
      {suggestions.length > 0 && (
        <Paper
          elevation={3}
          sx={{ mt: 1, maxHeight: "200px", overflowY: "auto" }}
        >
          <List>
            {suggestions.map((movie) => (
              <ListItem
                key={movie.imdbID}
                onClick={() => handleSuggestionClick(movie.Title)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {movie.Title}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
