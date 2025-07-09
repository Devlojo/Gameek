import { useBestGamesQuery } from "@/queries/useGamesQuery";
import { Loader } from "@/components/ui/Loader";
import gameekLogo from "@/images/gameek-removebg.png";
import { BsFire } from "react-icons/bs";
import { GameHoverCard } from "../ui/GameHoverCard";
import { Link } from "react-router-dom";

export const BestGamesSection = () => {
  const { bestGames, isSuccess } = useBestGamesQuery();

  return (
    <section className="h-auto rounded-md bg-customWhite px-4 py-3">
      <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
        <h2 className="text-2xl font-bold">Les mieux notés</h2>
        <div className="my-1 flex justify-center gap-1">
          <p>Top 10</p>
          <BsFire className="size-5 text-orange-600" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 sm:justify-center">
        {isSuccess && bestGames && bestGames.results.length > 0 ? (
          bestGames.results.map((game, index) => {
            return (
              <article
                className="group relative flex w-full flex-col sm:w-[48.5%]"
                key={index}
              >
                <Link to={`/games/reviews/${game.slug}`}>
                  <div className="relative w-full">
                    {game.background_image ? (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="h-56 w-full rounded-md object-cover shadow-md shadow-black"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-56 w-full items-center justify-center rounded-md bg-global object-cover shadow-md shadow-black">
                        <img
                          src={gameekLogo}
                          alt="logo du site"
                          className="h-12 w-32"
                        />
                      </div>
                    )}
                    <GameHoverCard
                      platforms={game.platforms}
                      genres={game.genres}
                      info="Voir les tests du jeu"
                    />

                    <p className="absolute bottom-0 w-full rounded-b-md bg-global bg-opacity-70 text-xs text-light shadow-sm shadow-black">
                      <span className="text-xl text-mainYellow">18</span>
                      ∕20 <span className="">(5 avis)</span>
                    </p>
                    <p className="rank absolute left-0 top-0 text-5xl text-customWhite">
                      {index + 1}
                    </p>
                  </div>

                  <h3 className="pt-1 text-lg font-bold">{game.name}</h3>
                </Link>
              </article>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};
