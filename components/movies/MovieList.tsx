import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByCategory, fetchMovieGenres } from "@/utils/api";
import MovieCard from "@/components/movies/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Interfejsy
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string; // 🔥 Dodane pole, które wcześniej brakowało
}


interface Genre {
  id: number;
  name: string;
}

type Category = { key: string; name: string; id?: number };

export default function MovieList() {
  const { data: genres, isLoading: isLoadingGenres, isError: isErrorGenres } = useQuery<Genre[]>({
    queryKey: ["movieGenres"],
    queryFn: fetchMovieGenres,
  });

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
        <MovieCategoryRowLazy
          key={category.name}
          category={category.key}
          genreId={category.id ?? undefined}
          name={category.name}
        />
      ))}
    </section>
  );
}

// Lazy loading kategorii filmów - dopiero po przewinięciu
function MovieCategoryRowLazy({ category, genreId, name }: { category: string; genreId?: number; name: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Odłączamy observer po pierwszym załadowaniu
        }
      },
      { threshold: 0.3 }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Jeśli sekcja jeszcze nie jest widoczna, nie renderujemy niczego
  if (!isVisible) return <div ref={rowRef} className="h-40"></div>;

  return (
    <div ref={rowRef} className="md:pl-4 relative">
      <h2 className="text-2xl font-semibold dark:text-white text-zinc-900 pl-5 mb-[-20px]">{name}</h2>
      <MovieCategoryRow category={category} genreId={genreId} />
    </div>
  );
}

// Komponent renderujący filmy w danej kategorii + strzałki
function MovieCategoryRow({ category, genreId }: { category: string; genreId?: number }) {
  const { data: movies, isLoading, isError } = useQuery<Movie[]>({
    queryKey: ["movies", category, genreId],
    queryFn: () => fetchMoviesByCategory(category, genreId),
    enabled: !!category, // Zapobiega niepotrzebnemu wywoływaniu zapytań
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

  const slidePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const slideNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="relative mb-12">
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
            <SwiperSlide key={movie.id} className="!w-auto flex-shrink-0 rounded-xl">
            <MovieCard
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
              overview={movie.overview} // 🔥 Dodaj ten prop
            />
          </SwiperSlide>          
          ))}
        </Swiper>

        {/* Lewa strzałka (pojawia się, gdy nie jesteśmy na początku) */}
        {!isBeginning && (
          <button
            onClick={slidePrev}
            className="absolute left-4 bottom-[-45px] -translate-y-1/2 bg-white hover:bg-white/50 dark:bg-black/50 dark:hover:bg-black/80 text-black dark:text-white p-3 rounded-full shadow-lg transition hover:scale-105 duration-300 z-10"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Prawa strzałka (znika, gdy jesteśmy na końcu) */}
        {!isEnd && (
          <button
            onClick={slideNext}
            className="absolute right-4 bottom-[-45px] -translate-y-1/2 bg-white hover:bg-white/50 dark:bg-black/50 dark:hover:bg-black/80 text-black dark:text-white p-3 rounded-full shadow-lg transition hover:scale-105 duration-300 z-10"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
