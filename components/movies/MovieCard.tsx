import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
}

export default function MovieCard({ id, title, posterPath, rating }: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-xl shadow-lg bg-black transition-all duration-500 hover:shadow-2xl group w-[250px] sm:w-[280px]"
    >
      <Link href={`/movie/${id}`} passHref>
        <div className="relative w-full h-[375px] flex justify-center items-center bg-black">
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent transition-all duration-500 group-hover:from-black/70 rounded-xl">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <p className="text-xs text-gray-300 mt-1 flex items-center gap-1">
            ⭐ <span className="font-medium">{rating.toFixed(1)}</span>
          </p>
        </div>

        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-indigo-500/50 transition-all duration-500 blur-md" />
      </Link>
    </motion.div>
  );
}
