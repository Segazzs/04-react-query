import SearchBar from "../SearchBar/SearchBar";
import { fetchMovieServices } from "../../services/movieService";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setMovies([]);
      const res = await fetchMovieServices(query);
      if (res.length === 0) {
        toast.error("No movies found for your query");
        return;
      }

      setMovies(res);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = (selectMovies: Movie) => {
    setSelectedMovie(selectMovies);
    setModalIsOpen(true);
  };

  const onClose = () => {
    setModalIsOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid movies={movies} onSelect={onSelect} />
      {modalIsOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
