import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { fetchMovies } from "../api/omdbApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import {
  Grid,
  Typography,
  CircularProgress,
  Container,
  Box,
  Pagination,
} from "@mui/material";

const DEFAULT_QUERY = "Marvel"; // ✅ Default movies to show on first load
const MOVIES_PER_PAGE = 8; // ✅ Limit to 8 movies per page

const MovieList = () => {
  const { movies, setMovies, searchQuery } = useContext(MovieContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // ✅ Track first load state

  useEffect(() => {
    const loadMovies = async () => {
      const query = isFirstLoad ? DEFAULT_QUERY : searchQuery;
      if (!query) return;

      setLoading(true);

      const data = await fetchMovies(query, page);
      if (data?.Search) {
        setMovies(data.Search);
        setTotalPages(
          searchQuery ? Math.ceil(data.totalResults / MOVIES_PER_PAGE) : 1
        );
      } else {
        setMovies([]);
        setTotalPages(1);
      }

      setLoading(false);
    };

    loadMovies();
  }, [searchQuery, page, isFirstLoad]);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 3, color: "#333" }}
      >
        🎬 Movie Finder
      </Typography>

      {/* Search Bar */}
      <Box display="flex" justifyContent="center" mb={4}>
        <SearchBar />
      </Box>

      {/* Loading State */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
        </Box>
      )}

      {/* No Results Found */}
      {!loading && movies.length === 0 && (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "#777", mt: 5 }}
        >
          No movies found. Try searching for something else! 🎥
        </Typography>
      )}

      {/* Movie Grid */}
      <Grid container spacing={3}>
        {movies.slice(0, MOVIES_PER_PAGE).map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {/* ✅ Show Pagination Only When User Searches */}
      {searchQuery && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            sx={{ "& .MuiPaginationItem-root": { fontSize: "1.1rem" } }}
          />
        </Box>
      )}
    </Container>
  );
};

export default MovieList;
