const API_KEY: string | undefined = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL: string = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
  poster_path?: string; // Upewnij się, że `poster_path` jest opcjonalne!
  vote_average: number;
  overview: string;
  backdrop_path?: string; // 🔥 Może być opcjonalne!
}


interface Genre {
  id: number;
  name: string;
}

interface APIResponse<T> {
  results: T;
}

// Pobieranie danych z API
async function fetchFromAPI<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T | null> {
  if (!API_KEY) {
    console.error("Brak klucza API.");
    return null;
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "pl-PL");

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, String(value))
  );

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Błąd API: ${response.status} - ${errorMessage}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Błąd API:", error);
    return null;
  }
}

// Wyszukiwanie filmów
export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  const data = await fetchFromAPI<APIResponse<Movie[]>>("search/movie", {
    query: encodeURIComponent(query),
  });
  return data?.results?.slice(0, 5) || [];
}

// Top filmy
export async function fetchTopMovies(): Promise<Movie[]> {
  const data = await fetchFromAPI<APIResponse<Movie[]>>("movie/top_rated", {
    page: 1,
  });
  return data?.results || [];
}

// Gatunki filmów
export async function fetchMovieGenres(): Promise<Genre[]> {
  const data = await fetchFromAPI<{ genres: Genre[] }>("genre/movie/list");
  return data?.genres || [];
}

// Filmy dla danej kategorii
export async function fetchMoviesByCategory(
  category: string,
  genreId?: number
): Promise<Movie[]> {
  let endpoint = "";
  const params: Record<string, string | number> = {};

  switch (category) {
    case "popular":
      endpoint = "movie/popular";
      break;
    case "trending":
      endpoint = "trending/movie/week";
      break;
    case "free":
      endpoint = "movie/popular";
      params.watch_region = "PL";
      params.with_watch_monetization_types = "free";
      break;
    default:
      if (genreId) {
        endpoint = "discover/movie";
        params.with_genres = genreId;
      } else {
        throw new Error("Nieprawidłowa kategoria filmów.");
      }
  }

  const data = await fetchFromAPI<APIResponse<Movie[]>>(endpoint, params);
  return data?.results || [];
}
