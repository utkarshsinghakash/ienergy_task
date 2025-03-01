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
        sx={{ backgroundColor: "#121212", color: "white" }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Typography variant="h5" textAlign="center" sx={{ color: "white" }}>
        Movie details not found.
      </Typography>
    );
  }

  // Extract Ratings
  const imdbRating = parseFloat(movie.imdbRating) / 2; // Convert IMDb 10 scale to 5-star
  const rottenTomatoes =
    movie.Ratings.find((r) => r.Source === "Rotten Tomatoes")?.Value || "N/A";
  const metacritic =
    movie.Ratings.find((r) => r.Source === "Metacritic")?.Value || "N/A";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,1)), url(${movie.Poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 0",
      }}
    >
      <Container maxWidth="md">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            mb: 3,
            backdropFilter: "blur(10px)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.4)" },
          }}
        >
          Back to Movies
        </Button>

        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            padding: "20px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
            color: "white",
          }}
        >
          {/* Movie Poster */}
          <CardMedia
            component="img"
            image={movie.Poster}
            alt={movie.Title}
            sx={{
              width: { xs: "100%", md: "40%" },
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />

          {/* Movie Details */}
          <CardContent sx={{ paddingLeft: "20px", flex: 1 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {movie.Title} ({movie.Year})
            </Typography>
            <Typography variant="h6" color="rgba(255,255,255,0.8)" gutterBottom>
              <LocalMoviesIcon sx={{ verticalAlign: "middle" }} /> {movie.Genre}{" "}
              | 🎭 {movie.Actors}
            </Typography>
            <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
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
              <strong>📅 Released:</strong> {movie.Released} | ⏳{" "}
              {movie.Runtime}
            </Typography>
            <Typography variant="body2">
              <strong>🏆 Awards:</strong> {movie.Awards}
            </Typography>
            <Typography variant="body2">
              <strong>💵 Box Office:</strong> {movie.BoxOffice}
            </Typography>
          </CardContent>
        </Card>

        {/* Movie Ratings Section */}
        <Box mt={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
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
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
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
                />
                <Typography variant="subtitle1">
                  <StarIcon
                    sx={{ color: "#FFD700", verticalAlign: "middle" }}
                  />{" "}
                  {movie.imdbRating} / 10
                </Typography>
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
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
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
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
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
    </Box>
  );
};

export default MovieDetail;
