import { PlatformBadge } from "../ui/PlatformBadge";
import { GenreBadge } from "../ui/GenreBadge";
type TGame = {
  platforms: { platform: { name: string } }[] | null;
  genres: {
    name: string;
  }[];
  info: string;
};
export const GameHoverCard = ({ platforms, genres, info }: TGame) => {
  return (
    <div className="inset-0 hidden flex-col items-center justify-center gap-3 rounded-md bg-global/75 opacity-0 transition duration-200 ease-in-out group-hover:opacity-100 lg:absolute lg:flex">
      <p className="font-bold text-customWhite">{info}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {platforms?.map((platform, index) => (
          <PlatformBadge platform={platform.platform.name} key={index} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {genres?.map((genre, index) => (
          <GenreBadge genre={genre.name} key={index} />
        ))}
      </div>
    </div>
  );
};
