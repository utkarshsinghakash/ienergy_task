import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => (
  <Card
    sx={{
      maxWidth: 280,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: "10px",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      },
    }}
  >
    <Link
      to={`/movie/${movie.imdbID}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <CardMedia
        component="img"
        image={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} // ✅ Handle missing posters
        alt={movie.Title}
        sx={{
          height: 350, // ✅ Consistent poster height
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{
          backgroundColor: "#fff",
          textAlign: "center",
          flexGrow: 1, // ✅ Ensures text area fills available space
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {movie.Title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {movie.Year}
        </Typography>
      </CardContent>
    </Link>
  </Card>
);

export default MovieCard;
