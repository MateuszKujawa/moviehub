import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByCategory, fetchMovieGenres } from "@/utils/api";
import MovieCard from "@/components/movies/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
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

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const sortedCategories = selectedCategory
  ? [selectedCategory, ...categories.filter((cat) => cat.name !== selectedCategory.name)]
  : categories;


  return (
    <section className="mx-auto relative">
      {isLoadingGenres && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {isErrorGenres && <p className="text-center text-red-500 text-lg">Błąd ładowania kategorii.</p>}

      <div className="mx-8 mb-4 flex justify-start">
        <select
          className="p-2 rounded-md border bg-white dark:bg-zinc-800 dark:text-white"
          onChange={(e) => {
            const selected = categories.find(cat => cat.name === e.target.value);
            setSelectedCategory(selected || null);
          }}
          value={selectedCategory?.name || ""}
        >
          <option value="">Sortuj po...</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>

      {sortedCategories.map((category) => (
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
          observer.disconnect();
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

// Render filmów w danej kategorii
function MovieCategoryRow({ category, genreId }: { category: string; genreId?: number }) {
  const { data: movies, isLoading, isError } = useQuery<Movie[], Error>({
    queryKey: ["movies", category, genreId],
    queryFn: async (): Promise<Movie[]> => {
      const result = await fetchMoviesByCategory(category, genreId);
      return result.map((movie) => ({
        ...movie,
        poster_path: movie.poster_path ?? "",
        vote_average: movie.vote_average ?? 0,
      }));
    },
    enabled: !!category,
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
     {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

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
          {Array.isArray(movies) && movies.map((movie: Movie) => (
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
