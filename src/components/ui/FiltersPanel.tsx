import { FilterSelect } from "@/components/ui/FilterSelect";
import { useSearchParams } from "react-router-dom";

type TItem = {
  count: number;
  results: {
    id: number;
    name: string;
  }[];
};
type TProps = {
  genres: TItem | undefined;
  platforms: TItem | undefined;
};

export const FiltersPanel = ({ genres, platforms }: TProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGenre = searchParams.get("genres");
  const selectedPlatform = searchParams.get("plateformes");
  console.log(selectedGenre);

  return (
    <div className="flex flex-wrap gap-4">
      {genres && <FilterSelect label="Genre" items={genres.results} />}
      {platforms && (
        <FilterSelect label="Plateforme" items={platforms.results} />
      )}
    </div>
  );
};
