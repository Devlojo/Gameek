import { useGenresQuery } from "@/queries/useGenresQuery";
import { usePlatformsQuery } from "@/queries/usePlatformsQuery";
import { useGamesQuery } from "@/queries/useGamesQuery";
import { Link } from "react-router-dom";
import { GameHoverCard } from "@/components/ui/GameHoverCard";
import { Pagination } from "@/components/ui/Pagination";
import { Loader } from "@/components/ui/Loader";
import { useSearchParams } from "react-router-dom";
import { FilterSelect } from "@/components/ui/FilterSelect";

export const Games = () => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const genre = parseInt(searchParams.get("genres") || "");
  const platform = parseInt(searchParams.get("plateformes") || "");

  const { genres, isLoadingGenres } = useGenresQuery();
  const { platforms, isLoadingPlatforms } = usePlatformsQuery();
  const { games, isLoadingGames } = useGamesQuery(page, genre, platform);

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Explore le catalogue
      </h1>
      {isLoadingGames && isLoadingGenres && isLoadingPlatforms ? (
        <Loader />
      ) : (
        <section className="flex w-full flex-col gap-2 rounded-md bg-customWhite px-3 pb-5">
          <div className="flex justify-center gap-8 pt-4">
            {genres && <FilterSelect label="Genre" items={genres.results} />}
            {platforms && (
              <FilterSelect label="Plateforme" items={platforms.results} />
            )}
          </div>
          <p className="text-center">{games?.count} jeux trouvés</p>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            {games?.results.map((game, index) => (
              <article
                className="group relative flex w-full flex-col rounded-md shadow-sm shadow-global sm:w-[48.5%]"
                key={index}
              >
                <Link to={`/jeu/${game.slug}`}>
                  <img
                    src={game.background_image as string}
                    alt={`Image de ${game.name}`}
                    loading="lazy"
                    className="h-[250px] w-full rounded-t-md object-cover sm:h-[200px]"
                  />

                  <h3 className="text-center text-lg font-semibold">
                    {game.name}
                  </h3>

                  <GameHoverCard
                    platforms={game.platforms}
                    genres={game.genres}
                    info="Voir les détails du jeu"
                  />
                </Link>
              </article>
            ))}
            <Pagination page={page} />
          </div>
        </section>
      )}
    </>
  );
};
