import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface Image {
  file_path: string;
}

export default function Gallery({ movieId }: { movieId: string }) {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    async function fetchImages() {
      try {
        const res = await fetch(`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`);
        const { backdrops } = await res.json();
        if (backdrops) setImages(backdrops.slice(0, 12));
      } catch (error) {
        console.error("Błąd pobierania zdjęć:", error);
      }
    }

    fetchImages();
  }, [movieId]);

  if (!images.length) return null;

  return (
    <div className="mt-8 px-4 container mx-auto py-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">Zobacz zdjęcia z filmu</h2>
      <div className="md:grid md:grid-cols-4 md:gap-6 flex overflow-x-scroll md:overflow-x-hidden space-x-4 md:space-x-0 snap-x snap-mandatory md:p-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
            alt={`Movie scene ${index + 1}`}
            className={`
              md:col-span-${index % 5 === 0 ? "2" : "1"} 
              md:row-span-${index % 5 === 0 ? "2" : "1"} 
              md:w-full md:h-full object-cover rounded-lg shadow-md mb-2
              w-auto h-auto flex-shrink-0 snap-center cursor-pointer md:hover:scale-[103%] md:hover:shadow-lg md:hover:shadow-gray-500/50 duration-300
            `}
            onClick={() => setSelectedImage(`https://image.tmdb.org/t/p/original${image.file_path}`)}
          />
        ))}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="relative max-w-4xl w-full p-4">
          <button
            className="absolute top-[-30px] right-4 text-white hover:text-gray-400 hover:scale-125 duration-300 text-4xl"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          {selectedImage && (
            <img src={selectedImage} alt="Preview" className="w-full h-auto rounded-sm shadow-lg" />
          )}
        </div>
      </Dialog>
    </div>
  );
}
