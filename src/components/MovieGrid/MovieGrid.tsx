import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((e) => (
        <li key={e.id} onClick={() => onSelect(e)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`}
              alt="movie title"
              loading="lazy"
            />
            <h2 className={css.title}>{e.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
