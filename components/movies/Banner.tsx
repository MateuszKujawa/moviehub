import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { MdOutlineMovie } from "react-icons/md";

interface BannerProps {
  movie: {
    title: string;
    backdrop_path: string | null;
    poster_path: string | null;
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    tagline?: string;
    id: number;
  };
  trailerKey: string | null;
  watchProvider: { name: string; logo: string } | null;
  onTrailerOpen: () => void;
}

export default function Banner({
  movie,
  trailerKey,
  watchProvider,
  onTrailerOpen,
}: BannerProps) {
  return (
    <div className="relative w-full h-[600px] flex items-center px-10 bg-black">
      {movie.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover opacity-50"
          priority
        />
      )}
      <div className="relative flex items-center gap-6 z-10">
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt="Miniatura filmu"
            width={220}
            height={330}
            className="rounded-lg shadow-lg"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-white">
            {movie.title}{" "}
            <span className="text-zinc-300 font-medium text-4xl">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>

          {movie.tagline && (
            <p className="text-xl italic text-gray-200 mt-1 font-thin">
              "{movie.tagline}"
            </p>
          )}

          <p className="text-lg text-gray-300 mt-2">
            📅 {movie.release_date} • ⏳ {movie.runtime} min
          </p>
          <p className="text-lg text-gray-300 mt-2">
            ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} głosów)
          </p>

          <div className="flex gap-4 mt-5">
            {trailerKey && (
              <Button variant="secondary" onClick={onTrailerOpen}>
                Obejrzyj trailer <FaPlay size={14} />
              </Button>
            )}

            {watchProvider && (
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}/watch`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white dark:bg-zinc-950 dark:text-white text-black px-4 py-2 rounded-lg
                         transition-all duration-200 ease-in-out hover:scale-105
                         hover:shadow-[0_0_20px_rgba(244,244,244,0.5)]"
              >
                <Image
                  src={watchProvider.logo}
                  alt={watchProvider.name}
                  width={32}
                  height={32}
                />
                <span className="text-lg font-semibold">
                  Oglądaj na {watchProvider.name}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
