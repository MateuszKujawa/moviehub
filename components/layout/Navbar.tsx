import { useState, useEffect } from "react";
import Link from "next/link";
import TypewriterTitle from "../ui/TypewriterTtitle";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import SearchBar from "./SearchBar"; // Importujemy wyszukiwarkę

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Jeśli użytkownik scrolluje >10px, zmienia tło
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-4 py-1.5 z-50 transition-all duration-300 ${
        isScrolled ? "bg-zinc-950 shadow-black/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" passHref>
            <TypewriterTitle text="MovieHub" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar /> {/* Dodajemy wyszukiwarkę */}
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
