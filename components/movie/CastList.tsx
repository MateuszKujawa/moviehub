import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Cast {
  name: string;
  character: string;
  profile_path: string | null;
}

interface CastListProps {
  cast: Cast[];
}

export default function CastList({ cast }: CastListProps) {
  return (
    <div className="w-full md:container mx-auto p-6 sm:p-10 text-center">
      <h3 className="text-3xl font-semibold mb-6">Obsada</h3>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 8 },
          }}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          className="w-full"
        >
          {cast.map((actor, index) => (
            <SwiperSlide key={actor.name + index} className="py-6 px-4">
              <a
                href={`https://www.google.com/search?q=${actor.name} aktor`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-zinc-800 rounded-lg shadow-md w-auto overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                {actor.profile_path ? (
                  <div className="w-full h-40 overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      width={150}
                      height={130}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gray-300 dark:bg-zinc-700 flex items-center justify-center text-gray-500">
                    Brak zdjęcia
                  </div>
                )}

                <div className="p-3 bg-white dark:bg-zinc-800">
                  <p className="font-bold text-sm text-center">
                    {actor.character}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                    {actor.name}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Strzałki pod Swiperem */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="swiper-prev bg-zinc-600 dark:bg-zinc-700 text-white p-2 rounded-full hover:bg-zinc-950 dark:hover:bg-zinc-950 transition cursor-pointer">
            <FaChevronLeft size={20} />
          </button>
          <button className="swiper-next bg-zinc-600 dark:bg-zinc-700 text-white p-2 rounded-full hover:bg-zinc-950 dark:hover:bg-zinc-950 transition cursor-pointer">
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
