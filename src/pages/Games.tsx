import { MenuItem } from "@/components/ui/MenuItem";
import { useGenresQuery } from "@/queries/useGenresQuery";
import { usePlatformsQuery } from "@/queries/usePlatformsQuery";
import { useLatestReviewsQuery } from "@/queries/useGamesQuery";
import { Link } from "react-router-dom";
import { GameHoverCard } from "@/components/ui/GameHoverCard";
import { Pagination } from "@/components/ui/Pagination";

export const Games = () => {
  const { genres } = useGenresQuery();
  const { latestReviews: games } = useLatestReviewsQuery();

  const { platforms } = usePlatformsQuery();
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Explore le catalogue
      </h1>
      <div className="flex w-full flex-col gap-2 rounded-md bg-customWhite px-3 pb-5">
        <div className="flex justify-center gap-4 p-2">
          {genres && <MenuItem label="Genre" items={genres?.results} />}
          {platforms && (
            <MenuItem label="Plateforme" items={platforms?.results} />
          )}
        </div>
        <p className="text-center">{games?.count} jeux trouvés</p>
        <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap">
          {games?.results.map((game, index) => (
            <article
              className="group relative flex w-full flex-col rounded-md shadow-sm shadow-global sm:w-[48.5%]"
              key={index}
            >
              <Link to={`/games/${game.slug}`}>
                <img
                  src={game.background_image as string}
                  alt={`Image de ${game.name}`}
                  loading="lazy"
                  className="h-[250px] w-full rounded-t-md object-cover sm:h-[200px]"
                />

                <p className="text-center">{game.name}</p>
                <GameHoverCard
                  platforms={game.platforms}
                  genres={game.genres}
                  info="Voir les détails du jeu"
                />
              </Link>
            </article>
          ))}
          <Pagination />
        </div>
      </div>
    </>
  );
};
