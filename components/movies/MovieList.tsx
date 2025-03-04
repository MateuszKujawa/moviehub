import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByCategory, fetchMovieGenres } from "@/utils/api";
import MovieCard from "@/components/movies/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Interfejs dla filmów
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

// Interfejs dla kategorii filmowych
interface Genre {
  id: number;
  name: string;
}

// Interfejs dla kategorii
type Category = { key: string; name: string; id?: number };

export default function MovieList() {
  // Pobiera dynamicznie listę gatunków filmowych
  const { data: genres, isLoading: isLoadingGenres, isError: isErrorGenres } = useQuery<Genre[]>({
    queryKey: ["movieGenres"],
    queryFn: fetchMovieGenres,
  });

  // Lista predefiniowanych kategorii + dynamicznie pobrane gatunki
  const categories: Category[] = [
    { key: "popular", name: "Najbardziej Popularne" },
    { key: "trending", name: "Trendy" },
    { key: "free", name: "Darmowe do Oglądania" },
    ...(genres || []).map((genre) => ({ key: "genre", id: genre.id, name: genre.name })),
  ];

  return (
    <section className="mx-auto relative">
      {isLoadingGenres && <p className="text-center text-lg">Ładowanie kategorii...</p>}
      {isErrorGenres && <p className="text-center text-red-500 text-lg">Błąd ładowania kategorii.</p>}

      {categories.map((category) => (
        <MovieCategoryRow
          key={category.name}
          category={category.key}
          genreId={category.id ?? undefined} // 👈 Jeśli brak id, ustawiamy `undefined`
          name={category.name}
        />
      ))}
    </section>
  );
}

function MovieCategoryRow({ category, genreId, name }: { category: string; genreId?: number; name: string }) {
  const { data: movies, isLoading, isError } = useQuery<Movie[]>({
    queryKey: ["movies", category, genreId],
    queryFn: () => fetchMoviesByCategory(category, genreId),
  });

  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  return (
    <div className="md:pl-4">
      <h2 className="text-2xl font-semibold dark:text-white text-zinc-900 pl-5 mb-[-20px]">
        {name}
      </h2>

      {isLoading && <p className="text-center text-lg">Ładowanie...</p>}
      {isError && <p className="text-center text-red-500 text-lg">Błąd ładowania filmów.</p>}

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerView="auto"
          className="flex items-center w-full"
          style={{
            paddingTop: "32px",
            paddingBottom: "32px",
            paddingLeft: "16px",
            paddingRight: "8px",
          }}
        >
          {movies?.map((movie: Movie) => (
            <SwiperSlide key={movie.id} className="!w-auto flex-shrink-0">
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
