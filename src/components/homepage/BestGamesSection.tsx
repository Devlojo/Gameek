import { useBestGamesQuery } from "@/queries/useGamesQuery";
import { Loader } from "@/components/ui/Loader";
import gameekLogo from "@/images/gameek-removebg.png";
import { BsFire } from "react-icons/bs";

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
                className="flex w-full flex-col hover:opacity-85 sm:w-[48.5%]"
                key={index}
              >
                <a href={"#" + game.slug}>
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

                    <p className="text-light absolute bottom-0 w-full bg-global bg-opacity-70 text-xs shadow-sm shadow-black">
                      <span className="text-xl text-mainYellow">18</span>
                      ∕20 <span className="">(5 avis)</span>
                    </p>
                  </div>

                  <h3 className="text-lg">{game.name}</h3>
                </a>
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
