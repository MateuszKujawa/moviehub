import { useState, useRef } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

interface HamburgerMenuProps {
  smoothScrollTo: (elementId: string, speed?: number) => void;
}

export default function HamburgerMenu({ smoothScrollTo }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      <div
        className={`fixed top-0 right-0 h-full bg-gradient-to-b from-black via-black to-black/90 text-white shadow-lg z-50 transform transition-transform duration-300 
        ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-[80vw] sm:w-[60vw] md:w-[40vw]`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Nawigacja */}
        <nav ref={menuRef} className="p-5">
          <ul className="flex flex-col space-y-6 text-xl">
            <li>
              <Link
                href="/"
                className="text-white hover:text-gray-300 duration-300"
                onClick={() => setIsOpen(false)}
              >
                Strona Główna
              </Link>
            </li>

            <li>
              <button
                onClick={() => {
                  smoothScrollTo("movieList", 300);
                  setIsOpen(false);
                }}
                className="text-white text-xl hover:text-gray-300 duration-300"
              >
                Kategorie filmowe
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
