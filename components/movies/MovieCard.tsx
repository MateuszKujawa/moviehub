import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  overview: string;
}

export default function MovieCard({ id, title, posterPath, rating, overview }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const maxOverviewLength = 120;
  const truncatedOverview =
    overview.length > maxOverviewLength ? overview.substring(0, maxOverviewLength) + "..." : overview;

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 group w-[250px] sm:w-[280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movie/${id}`} passHref>
        <div className="relative w-full h-[375px] flex justify-center items-center bg-black overflow-hidden rounded-xl">
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="rounded-xl transition-transform duration-200 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-200" />
        </div>

        <div
          className={`absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black via-black/50 to-transparent rounded-b-xl transition-all duration-300 ${
            isHovered ? "h-[155px]" : "h-[90px]"
          }`}
        >
          <h3 className="text-md font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-300 mt-1 flex items-center gap-1">
            ⭐ <span className="font-medium">{rating.toFixed(1)}</span>
          </p>

          <p
            className={`text-sm text-gray-300 mt-2 transition-opacity duration-150 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {truncatedOverview}
          </p>
        </div>

        <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-200 group-hover:border-indigo-500/50" />
      </Link>
    </div>
  );
}
