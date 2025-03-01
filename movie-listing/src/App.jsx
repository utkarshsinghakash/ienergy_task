import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  </Router>
);

export default App;
