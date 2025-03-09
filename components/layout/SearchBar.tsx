import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/utils/api";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { Movie } from '@/utils/api'


export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { data: movies = [], isFetching } = useQuery<Movie[]>({
    queryKey: ["search", searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const toggleSearch = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center" ref={searchContainerRef}>
      <button
        className="text-white text-lg p-2 rounded-full hover:bg-black/50 transition w-10 h-10 flex items-center justify-center"
        onClick={toggleSearch}
      >
        <FaSearch className={`transition-opacity duration-200 `} />
      </button>

      <div
        className={`absolute right-12 top-1/2 -translate-y-4 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-[280px] md:w-[230px] transform ${
          isOpen ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-10 pointer-events-none"
        }`}
      >
        <div className="px-2 py-1 border-b  flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj..."
            className="w-full bg-transparent outline-none text-sm py-1"
          />
        </div>

        {searchQuery && (
          <div className="h-auto overflow-y-auto">
            {isFetching && <p className="p-2 text-center">Ładowanie...</p>}
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
                  <div className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer flex items-center space-x-3 transition border-b ">
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-medium">{movie.title}</h3>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-2 text-center text-gray-500">Brak wyników</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
