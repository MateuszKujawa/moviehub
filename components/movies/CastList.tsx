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
      <h3 className="text-2xl font-semibold mb-6">Obsada</h3>
      
      <div className="relative">
        {/* Swiper */}
        <Swiper 
          modules={[Navigation]} 
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 6 },
          }}  
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          className="w-full"
        >
          {cast.map((actor) => (
            <SwiperSlide key={actor.name} className="py-6 px-4">
              <a 
                href={`https://www.google.com/search?q=${actor.name} aktor`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-white dark:bg-zinc-800 px-2 py-6 rounded-lg shadow-md w-40 h-[230px] transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                {actor.profile_path ? (
                  <div className="rounded-sm w-fit mx-auto overflow-hidden">
                    <Image
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    width={160}
                    height={160}
                    className="object-contain w-full h-32"
                    />
                  </div>
                  
                ) : (
                  <div className="w-full h-32 bg-gray-300 dark:bg-zinc-700 rounded-md flex items-center justify-center text-gray-500">
                    Brak zdjęcia
                  </div>
                )}
                <p className="font-bold mt-2 text-sm">{actor.character}</p>
                <p className="text-gray-400 text-sm">{actor.name}</p>
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
