import SearchBar from "../SearchBar/SearchBar";
import { fetchMovieServices } from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(2);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["movie", query, page],
    queryFn: () => fetchMovieServices(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  console.log(data);

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

      <ReactPaginate
        pageCount={data?.total_pages ?? 0}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && <MovieGrid movies={data.results} onSelect={onSelect} />}
      {modalIsOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
    </>
  );
}
