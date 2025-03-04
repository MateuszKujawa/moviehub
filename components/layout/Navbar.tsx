import Link from "next/link";
import TypewriterTitle from "../ui/TypewriterTtitle";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import SearchBar from "./SearchBar"; // Importujemy wyszukiwarkę

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/20 shadow-md px-4 py-1.5 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="">
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
