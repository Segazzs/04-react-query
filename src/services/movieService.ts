import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMovieResponseProps {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovieServices = async (query: string, page: number) => {
  const myKey = import.meta.env.VITE_API_KEY;

  const options = {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
    params: {
      page: page,
    },
  };

  const res = await axios.get<FetchMovieResponseProps>(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    options
  );
  return res.data;
};
