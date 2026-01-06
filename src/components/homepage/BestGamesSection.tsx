import { useBestGamesQuery } from "@/queries/useGamesQuery";
import gameekLogo from "@/images/gameek-removebg.png";
import { BsFire } from "react-icons/bs";
import { GameHoverCard } from "../ui/GameHoverCard";
import { Link } from "react-router-dom";
import { Loader } from "../ui/Loader";

export const BestGamesSection = () => {
  const { bestGames, isSuccess, isLoading } = useBestGamesQuery();
  const checkedGames = bestGames?.games.filter(
    (game) => game.avg_grade !== null,
  );

  return (
    <section className="h-auto rounded-md bg-customWhite px-4 py-3">
      <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
        <h2 className="text-2xl font-bold">Les mieux notés</h2>
        <div className="my-1 flex justify-center gap-1">
          <p>Top 10</p>
          <BsFire className="size-5 text-orange-600" />
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        {isLoading && <Loader />}
        {isSuccess && checkedGames && checkedGames.length > 0 ? (
          checkedGames.map((game, index) => {
            return (
              <article
                className="group relative flex w-full flex-col sm:w-[49%]"
                key={index}
              >
                <Link to={`/jeu/tests/${game.slug}`}>
                  <div className="relative w-full">
                    {game.background_image ? (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="h-64 w-full object-cover shadow-md shadow-black"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-56 w-full items-center justify-center bg-global object-cover shadow-md shadow-black">
                        <img
                          src={gameekLogo}
                          alt="logo du site"
                          className="h-32"
                        />
                      </div>
                    )}
                    <GameHoverCard
                      platforms={game.platforms}
                      genres={game.genres}
                      info="Voir les tests du jeu"
                    />

                    <div className="absolute bottom-0 flex w-full items-center bg-global bg-opacity-70 text-xs text-customWhite shadow-sm shadow-black md:py-1">
                      <p className="mx-1 text-[16px] font-medium">
                        Note moyenne :{" "}
                      </p>
                      <span className="text-xl font-semibold text-mainYellow">
                        {game.avg_grade}
                      </span>
                      ∕20{" "}
                      <span className="ml-1">({game.number_reviews} avis)</span>
                    </div>
                    <p className="rank absolute left-0 top-0 text-5xl text-customWhite">
                      {index + 1}
                    </p>
                  </div>

                  <h3 className="pt-1 text-lg font-semibold">{game.name}</h3>
                </Link>
              </article>
            );
          })
        ) : (
          <p>Aucun jeu n’a encore été évalué</p>
        )}
      </div>
    </section>
  );
};
