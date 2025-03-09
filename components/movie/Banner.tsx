import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";

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
    <div className="relative w-full h-screen md:h-[600px] flex flex-col md:flex-row items-center justify-center md:justify-center px-6 md:px-10 bg-black">
      {movie.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover opacity-50"
          priority
        />
      )}

      {/* Główna zawartość */}
      <div className="container relative flex flex-col md:flex-row items-start md:items-center gap-6 z-10 w-full">
        {/* Miniatura (sm-size) */}
        <div className="w-full flex md:hidden">
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt="Miniatura filmu"
              width={180} // Zmniejszona miniatura na mobilnych
              height={270}
              className="rounded-lg shadow-lg shadow-black"
            />
          )}
        </div>

        {/* Przyciski (sm-size) */}
        <div className="flex flex-col md:hidden mt-4 text-left">
          <h1 className="text-3xl font-bold text-white">
            {movie.title}{" "}
            <span className="text-zinc-300 font-medium">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>

          {movie.tagline && (
            <p className="text-lg italic text-gray-200 mt-1 font-thin">
              "{movie.tagline}"
            </p>
          )}

          <p className="text-md text-gray-300 mt-2">
            📅 {movie.release_date} • {movie.runtime ? `⏳ ${movie.runtime} min` : "⏳ Czas trwania nieznany"}
          </p>

          <p className="text-md text-gray-300 mt-2">
            ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} głosów)
          </p>

          {/* Przycisk "Oglądaj na" */}
          {watchProvider && (
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}/watch`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white dark:bg-zinc-950 dark:text-white text-black px-8 py-2 mt-4 rounded-lg
                       transition-all duration-200 ease-in-out hover:scale-105
                       dark:hover:shadow-[0_0_20px_rgba(000,000,000,0.7)] hover:shadow-[0_0_20px_rgba(244,244,244,0.5)] w-fit"
            >
              <Image
                src={watchProvider.logo}
                alt={watchProvider.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-semibold">
                Oglądaj na {watchProvider.name}
              </span>
            </a>
          )}

          {/* Przycisk "Obejrzyj trailer" */}
          {trailerKey && (
            <Button
              variant="secondary"
              onClick={onTrailerOpen}
              className="mt-3 w-fit px-6 py-6 text-lg"
            >
              Obejrzyj trailer <FaPlay size={14} />
            </Button>
          )}
        </div>

        {/* Miniatura (lg-size) */}
        <div className="hidden md:flex justify-center items-center">
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt="Miniatura filmu"
              width={220}
              height={330}
              className="rounded-lg shadow-lg shadow-black"
            />
          )}
        </div>

        {/* Opis i przyciski (lg-size) */}
        <div className="hidden md:flex flex-col items-start justify-center">
          {/* Tytuł filmu */}
          <h1 className="text-4xl font-bold text-white">
            {movie.title}{" "}
            <span className="text-zinc-300 font-medium">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>

          {/* Tagline filmu */}
          {movie.tagline && (
            <p className="text-xl italic text-gray-200 mt-1 font-thin">
              "{movie.tagline}"
            </p>
          )}

          {/* Data wydania | Czas trwania */}
          <p className="text-lg text-gray-300 mt-2">
            📅 {movie.release_date} •{" "}
            {movie.runtime
              ? `⏳ ${movie.runtime} min`
              : "⏳ Czas trwania nieznany"}
          </p>

          {/* Oceny */}
          {movie.vote_average && movie.vote_count ? (
            <p className="text-md text-gray-300 mt-2">
              ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} głosów)
            </p>
          ) : (
            <p className="text-md text-gray-300 mt-2">⭐ Brak ocen</p>
          )}

          {/* Przycisk "Oglądaj na" */}
          {watchProvider?.name && watchProvider?.logo && (
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}/watch`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white dark:bg-zinc-950 dark:text-white text-black px-6 py-2 mt-4 rounded-lg
             transition-all duration-200 ease-in-out hover:scale-105
             dark:hover:shadow-[0_0_20px_rgba(000,000,000,0.7)] hover:shadow-[0_0_20px_rgba(244,244,244,0.5)] w-fit"
            >
              <Image
                src={watchProvider.logo}
                alt={watchProvider.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-semibold">
                Oglądaj na {watchProvider.name}
              </span>
            </a>
          )}

          {/* Przycisk "Obejrzyj trailer" */}
          {trailerKey && (
            <Button
              variant="secondary"
              onClick={onTrailerOpen}
              className="mt-3 w-fit px-6 py-6 text-lg flex items-center gap-2"
            >
              Obejrzyj trailer <FaPlay size={14} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
