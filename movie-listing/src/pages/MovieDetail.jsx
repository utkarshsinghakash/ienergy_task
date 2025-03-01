import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/omdbApi";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Rating,
  Stack,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    getMovie();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Typography variant="h5" textAlign="center">
        Movie details not found.
      </Typography>
    );
  }

  // Extract Ratings (IMDb, Rotten Tomatoes, Metacritic)
  const imdbRating = parseFloat(movie.imdbRating) / 2; // Convert IMDb 10 scale to 5-star
  const rottenTomatoes =
    movie.Ratings.find((r) => r.Source === "Rotten Tomatoes")?.Value || "N/A";
  const metacritic =
    movie.Ratings.find((r) => r.Source === "Metacritic")?.Value || "N/A";

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "40px 20px",
        backgroundColor: "#f8f8f8",
        borderRadius: "10px",
      }}
    >
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{
          backgroundColor: "#333",
          color: "white",
          mb: 3,
          "&:hover": { backgroundColor: "#555" },
        }}
      >
        Back to Movies
      </Button>

      {/* Movie Poster & Details */}
      <Grid container spacing={4}>
        {/* Movie Poster */}
        <Grid item xs={12} sm={5}>
          <Card sx={{ boxShadow: 3, borderRadius: "10px" }}>
            <CardMedia component="img" image={movie.Poster} alt={movie.Title} />
          </Card>
        </Grid>

        {/* Movie Information */}
        <Grid item xs={12} sm={7}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movie.Title} ({movie.Year})
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            <LocalMoviesIcon sx={{ verticalAlign: "middle" }} /> {movie.Genre} |
            🎭 {movie.Actors}
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.Plot}
          </Typography>
          <Typography variant="body2">
            <strong>🎥 Director:</strong> {movie.Director}
          </Typography>
          <Typography variant="body2">
            <strong>📝 Writer:</strong> {movie.Writer}
          </Typography>
          <Typography variant="body2">
            <strong>🌍 Country:</strong> {movie.Country}
          </Typography>
          <Typography variant="body2">
            <strong>📅 Released:</strong> {movie.Released} |{" "}
            <strong>⏳ Runtime:</strong> {movie.Runtime}
          </Typography>
          <Typography variant="body2">
            <strong>🏆 Awards:</strong> {movie.Awards}
          </Typography>
          <Typography variant="body2">
            <strong>💵 Box Office:</strong> {movie.BoxOffice}
          </Typography>
        </Grid>
      </Grid>

      {/* Movie Ratings Section */}
      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🎯 Ratings
        </Typography>
        <Grid container spacing={3}>
          {/* IMDb Rating */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: "10px",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                IMDb Rating
              </Typography>
              <Rating
                value={imdbRating}
                precision={0.5}
                readOnly
                size="large"
                sx={{ mt: 1 }}
              />
              <Typography variant="subtitle1">
                <StarIcon sx={{ color: "#FFD700", verticalAlign: "middle" }} />{" "}
                {movie.imdbRating} / 10
              </Typography>
              <Typography variant="caption">{movie.imdbVotes} votes</Typography>
            </Card>
          </Grid>

          {/* Rotten Tomatoes */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: "10px",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Rotten Tomatoes
              </Typography>
              <Typography variant="h5" color="error" fontWeight="bold">
                🍅 {rottenTomatoes}
              </Typography>
            </Card>
          </Grid>

          {/* Metacritic */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: "10px",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Metacritic
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                🎭 {metacritic}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MovieDetail;
