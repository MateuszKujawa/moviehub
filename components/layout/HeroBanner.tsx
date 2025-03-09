import { useQuery, QueryFunction } from "@tanstack/react-query";
import { fetchTopMovies } from "@/utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { Movie } from '@/utils/api'


const fetchMovies = async (): Promise<Movie[]> => {
  return fetchTopMovies();
};


export default function HeroBanner() {
  const { data, isLoading, isError } = useQuery<Movie[]>({
    queryKey: ["topMovies"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5,
  });

  const movies = data ?? [];
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  return (
    <div className="relative w-full h-[100vh] mb-12">
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {isError && (
        <p className="text-center text-red-500 text-lg">
          Błąd ładowania filmów.
        </p>
      )}

      {movies.length > 0 && (
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          loop
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={{
            nextEl: ".hero-next",
            prevEl: ".hero-prev",
          }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
          }}
          className="w-full h-full"
        >
          {movies.slice(0, 5).map((movie) => (
            <SwiperSlide key={movie.id} className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90" />
              <div className="absolute bottom-16 md:bottom-36 left-6 md:left-28 text-white max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                <p className="text-lg mb-6 line-clamp-3 opacity-90">
                  {movie.overview}
                </p>
                <button
                  onClick={() => router.push(`/movie/${movie.id}`)}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-white text-black text-lg font-semibold rounded-full border border-transparent hover:bg-transparent hover:border-white hover:text-white transition duration-300"
                >
                  <span>Sprawdź film</span>
                  <FaChevronRight size={20} />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <button
        className="hero-prev absolute left-6 top-[45%] transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/80 duration-300 p-2.5 rounded-full z-10"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FaChevronLeft size={25} />
      </button>
      <button
        className="hero-next absolute right-6 top-[45%] transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/80 duration-300 p-2.5 rounded-full z-10"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FaChevronRight size={25} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="hero-pagination !flex !space-x-2"></div>
      </div>

      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background-color: white !important;
          width: 8px !important;
          height: 8px !important;
          opacity: 0.8 !important;
          margin: 0 !important;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        :global(.swiper-pagination-bullet-active) {
          background-color: white !important;
          opacity: 1 !important;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
