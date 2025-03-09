interface CrewMember {
    name: string;
    job: string;
  }
  
  interface DescriptionProps {
    overview: string;
    crew: CrewMember[];
  }
  
  export default function Description({ overview, crew }: DescriptionProps) {
    const director = crew.find((member) => member.job === "Director");
    const keyCrew = crew.filter((member) => ["Writer", "Producer", "Composer"].includes(member.job));
  
    return (
      <div className="container mx-auto p-6 sm:p-10">
        <h1 className="text-2xl font-semibold mb-2">Opis filmu</h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{overview}</p>
  
        {/* 🔹 Sekcja Twórców */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Twórcy filmu</h2>
          <ul className="text-gray-700 dark:text-gray-400 flex flex-wrap gap-4">
            {director && (
              <li>
                <span className="font-bold">Reżyser:</span> {director.name}
              </li>
            )}
            {keyCrew.map((member) => (
              <li key={member.name}>
                <span className="font-bold">{member.job}:</span> {member.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  