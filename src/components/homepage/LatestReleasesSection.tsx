import { useLatestGamesQuery } from "@/queries/useGamesQuery";
import { GenreBadge } from "@/components/ui/GenreBadge";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { Loader } from "@/components/ui/Loader";
import { ImFire } from "react-icons/im";
import gameekLogo from "@/images/gameek-removebg.png";

export const LatestReleasesSection = () => {
  const { latestGames, isSuccess } = useLatestGamesQuery();

  return (
    <>
      <section className="h-auto rounded-xl bg-customWhite px-4 py-3">
        <div className="flex items-center gap-2 pb-3 text-2xl font-bold max-md:justify-center">
          <h2>Les dernières sorties </h2>
          <ImFire className="text-orange-500" />
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500">
          {isSuccess && latestGames && latestGames.results.length > 0
            ? latestGames.results.map((game, index) => (
                <article
                  className="flex w-72 flex-shrink-0 flex-col hover:opacity-85"
                  key={index}
                >
                  <a href={"#" + game.slug}>
                    <div className="relative mb-2 w-full">
                      {game.background_image ? (
                        <img
                          src={game.background_image}
                          alt={game.name}
                          className="h-72 w-full rounded-sm object-cover shadow-md shadow-black"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-72 w-full items-center justify-center bg-global object-cover shadow-sm shadow-black lg:h-40">
                          <img
                            src={gameekLogo}
                            alt="logo du site"
                            className="h-20"
                          />
                        </div>
                      )}

                      <div className="absolute right-0 top-0 flex flex-wrap gap-1">
                        {game.genres.map((genre, index) => (
                          <GenreBadge genre={genre.name} key={index} />
                        ))}
                      </div>

                      <div className="absolute bottom-0 flex w-full flex-col items-center justify-center bg-global bg-opacity-70 text-customWhite">
                        <h3 className="text-lg">{game.name}</h3>
                        <p className="text-sm">{game.released}</p>
                      </div>
                    </div>
                    <div className="mb-10 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {game.platforms && game.platforms.length > 0 ? (
                          game.platforms.map((platform, index) => (
                            <PlatformBadge
                              platform={platform.platform.name}
                              key={index}
                            />
                          ))
                        ) : (
                          <Loader />
                        )}
                      </div>
                    </div>
                  </a>
                </article>
              ))
            : [<Loader />]}
        </div>
      </section>
    </>
  );
};
