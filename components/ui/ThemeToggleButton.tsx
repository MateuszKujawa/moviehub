import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggleButton() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log("useEffect: Sprawdzam stan z localStorage");
    const isDark = localStorage.getItem("theme") === "dark";
    console.log("useEffect: Tryb ciemny w localStorage:", isDark);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Funkcja do przełączania trybu ciemnego
  const toggleDarkMode = useCallback(() => {
    console.log("toggleDarkMode: Wywołano toggle");
    const newMode = !darkMode;
    if (darkMode === newMode) return; // Jeśli stan nie zmienia się, nie wykonuj dalszych operacji
    console.log("toggleDarkMode: Nowy tryb:", newMode ? "ciemny" : "jasny");
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  }, [darkMode]);

  console.log("Render: DarkMode aktualny stan:", darkMode);

  return (
    <button
      onClick={toggleDarkMode}
      className="relative flex items-center justify-center w-14 h-8 rounded-full bg-indigo-100 hover:bg-indigo-200 dark:bg-zinc-600 dark:hover:bg-gray-500"
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.span
            key="light"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path className="fill-yellow-500" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
              <path className="fill-yellow-500" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="dark"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path className="fill-indigo-600" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
              <path className="fill-indigo-600" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
