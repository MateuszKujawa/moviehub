const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


// Wyszukiwanie filmów
export async function searchMovies(query: string) {
  if (!query) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pl-PL&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Nie udało się pobrać wyników wyszukiwania.");
    const data = await response.json();
    return data.results.slice(0, 5); // Max 5 wyników
  } catch (error) {
    console.error("Błąd API (wyszukiwanie filmów):", error);
    return [];
  }
}

// Top filmy
export async function fetchTopMovies() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pl-PL&page=1`);
    if (!response.ok) throw new Error("Nie udało się pobrać filmów.");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Błąd API (topowe filmy):", error);
    return [];
  }
}

// Gatunki filmów
export async function fetchMovieGenres() {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pl-PL`);
    if (!response.ok) throw new Error("Nie udało się pobrać gatunków filmowych.");
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Błąd API (gatunki filmowe):", error);
    return [];
  }
}

// Filmy dla danej kategorii
export async function fetchMoviesByCategory(category: string, genreId?: number) {
  let url = "";

  if (category === "popular") {
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pl-PL`;
  } else if (category === "trending") {
    url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pl-PL`;
  } else if (category === "free") {
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pl-PL&watch_region=PL&with_watch_monetization_types=free`;
  } else if (genreId) {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pl-PL&with_genres=${genreId}`;
  } else {
    throw new Error("Nieprawidłowa kategoria filmów.");
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Nie udało się pobrać filmów.");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Błąd API:", error);
    return [];
  }
}
