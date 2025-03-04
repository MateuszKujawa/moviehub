import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/utils/api";
import Link from "next/link";
import { FaSearch, FaTimes } from "react-icons/fa";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }
  

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pobieranie filmów na podstawie wpisanego tekstu
  const { data: movies = [], isFetching } = useQuery<Movie[]>({
    queryKey: ["search", searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: searchQuery.length > 0, // Pobieramy dane tylko jeśli wpisano tekst
  });

  // Obsługa otwierania/zamykania wyszukiwarki
  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200); // Automatyczne focusowanie inputa
    }
  };

  return (
    <div className="relative">
      {/* Ikonka lupy */}
      {!isOpen && (
        <button
          className="text-white text-lg p-2 rounded-full hover:bg-black/50 transition"
          onClick={toggleSearch}
        >
          <FaSearch />
        </button>
      )}

      {/* Pole wyszukiwania */}
      {isOpen && (
        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center bg-white text-black rounded-full shadow-lg px-4 w-72 transition-all duration-300">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj filmów..."
            className="w-full bg-transparent outline-none text-sm py-2"
          />
          {/* Ikonka zamykania */}
          <button className="text-black hover:text-red-500 transition ml-2" onClick={toggleSearch}>
            <FaTimes />
          </button>
        </div>
      )}

      {/* Wyniki wyszukiwania */}
      {isOpen && searchQuery && movies.length > 0 && (
        <div className="absolute right-0 mt-8 w-72 bg-white text-black rounded-lg shadow-lg overflow-hidden transition-all duration-300">
          {isFetching && <p className="p-2 text-center">Ładowanie...</p>}
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
              <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 transition border-b">
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  className="w-12 h-14 rounded-md"
                />
                <div>
                  <h3 className="text-sm font-medium">{movie.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
