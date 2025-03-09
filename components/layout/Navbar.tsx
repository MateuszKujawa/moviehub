import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import TypewriterTitle from "../ui/TypewriterTtitle";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import SearchBar from "./SearchBar";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string, speed = 400) => {
    const target = document.getElementById(elementId);
    if (!target) return;

    const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
    const offsetTop =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

    let start = window.scrollY;
    let distance = offsetTop - start;
    let startTime: number | null = null;

    const animationDuration = speed;

    function scrollStep(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / animationDuration, 1);
      window.scrollTo(0, start + distance * progress);

      if (timeElapsed < animationDuration) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  };

  const goToCategories = () => {
    if (router.pathname !== "/") {
      router.push("/").then(() => {
        setTimeout(() => smoothScrollTo("movieList", 300), 100);
      });
    } else {
      smoothScrollTo("movieList", 300);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-4 py-1.5 z-50 transition-all duration-300 ${
        isScrolled ? "bg-zinc-950 shadow-black/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-48">
          <Link href="/" passHref>
            <TypewriterTitle text="MovieHub" />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-6 2xl:mr-52">
          <Link
            href="/"
            className="text-white text-lg font-light drop-shadow-sm hover:text-gray-300 transition"
          >
            Strona Główna
          </Link>

          <button
            onClick={goToCategories}
            className="text-white text-lg font-light drop-shadow-sm hover:text-gray-300 transition"
          >
            Kategorie filmowe
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBar />
          <ThemeToggleButton />

          <div className="md:hidden">
            <HamburgerMenu smoothScrollTo={goToCategories} />
          </div>
        </div>
      </div>
    </nav>
  );
}
