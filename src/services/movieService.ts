import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMovieResponseProps {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovieServices = async (query: string): Promise<Movie[]> => {
  const myKey = import.meta.env.VITE_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };

  const res = await axios.get<FetchMovieResponseProps>(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    options
  );
  return res.data.results;
};
