import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Banner from "@/components/movies/Banner";
import Description from "@/components/movies/Description";
import CastList from "@/components/movies/CastList";
import TrailerModal from "@/components/movies/TrailerModal";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  tagline?: string;
}

interface Video {
  key: string;
  site: string;
  type: string;
}

interface Crew {
  name: string;
  job: string;
}

interface Cast {
  name: string;
  character: string;
  profile_path: string | null;
}

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [watchProvider, setWatchProvider] = useState<{ name: string; logo: string } | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
  
    async function fetchMovieDetails() {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pl-PL`);
        const data = await res.json();
        setMovie(data);
  
        const videoRes = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pl-PL`);
        const videoData = await videoRes.json();
  
        let trailer = videoData.results.find((v: Video) => v.site === "YouTube" && v.type === "Trailer");
        if (!trailer) {
          trailer = videoData.results.find((v: Video) => v.site === "YouTube");
        }
        setTrailerKey(trailer ? trailer.key : null);
  
        const watchRes = await fetch(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`);
        const watchData = await watchRes.json();
  
        const providers = watchData.results?.PL;
        if (providers?.flatrate?.length) {
          setWatchProvider({
            name: providers.flatrate[0].provider_name,
            logo: `https://image.tmdb.org/t/p/original${providers.flatrate[0].logo_path}`
          });
        } else if (providers?.buy?.length) {
          setWatchProvider({
            name: providers.buy[0].provider_name,
            logo: `https://image.tmdb.org/t/p/original${providers.buy[0].logo_path}`
          });
        } else if (providers?.rent?.length) {
          setWatchProvider({
            name: providers.rent[0].provider_name,
            logo: `https://image.tmdb.org/t/p/original${providers.rent[0].logo_path}`
          });
        }
        
        const creditsRes = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 10));
        setCrew(creditsData.crew.slice(0, 5));
      } catch (err) {
        console.error("Błąd API:", err);
      }
    }
  
    fetchMovieDetails();
  }, [id]);
  
  

  const handleTrailerOpen = () => {
    if (!trailerKey) {
      alert("Brak dostępnego trailera dla tego filmu.");
      return;
    }
    setShowTrailer(true);
  };

  if (!movie) return <Skeleton className="w-full h-96 rounded-lg" />;

  return (
    <div className="min-h-screen dark:bg-zinc-900 bg-gray-200 text-zinc-900 dark:text-gray-100">
      <Banner 
        movie={movie} 
        trailerKey={trailerKey} 
        watchProvider={watchProvider} 
        onTrailerOpen={handleTrailerOpen} 
      />

      <Description overview={movie.overview} crew={crew} />
      <CastList cast={cast} />
      {showTrailer && trailerKey && <TrailerModal trailerKey={trailerKey} onClose={() => setShowTrailer(false)} />}
    </div>
  );
}
