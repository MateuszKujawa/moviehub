import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/layout/HeroBaner";
import MovieList from "@/components/movies/MovieList";

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-zinc-900 bg-gray-200 dark:text-gray-100 text-zinc-900">
      <Navbar />
      <HeroBanner />
      <MovieList/>
    </div>
  );
}
