import SearchBar from "../SearchBar/SearchBar";
import { fetchMovieServices } from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["movie", query],
    queryFn: () => fetchMovieServices(query),
    enabled: query !== "",
  });

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
      {data && <MovieGrid movies={data} onSelect={onSelect} />}
      {modalIsOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
    </>
  );
}
