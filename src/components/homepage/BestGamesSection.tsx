import { GenreBadge } from "@/components/ui/GenreBadge";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { useBestGamesQuery } from "@/queries/useGamesQuery";
import { Loader } from "@/components/ui/Loader";
import gameekLogo from "@/images/gameek-removebg.png";
import { MenuItem } from "@/components/ui/MenuItem";
import { useGenresQuery } from "@/queries/useGenresQuery";
import { usePlatformsQuery } from "@/queries/usePlatformsQuery";

export const BestGamesSection = () => {
  const { bestGames, isSuccess } = useBestGamesQuery();
  const { genres } = useGenresQuery();
  const { platforms } = usePlatformsQuery();

  return (
    <section className="h-auto rounded-md bg-customWhite px-4 py-3">
      <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
        <h2 className="text-2xl font-bold">Les mieux notés</h2>
        <div className="my-1 flex justify-center gap-2">
          <MenuItem
            label="Genre"
            items={genres?.results || []}
            itemKey="name"
          />
          <MenuItem
            label="Plateforme"
            items={platforms?.results || []}
            itemKey="name"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 sm:justify-between">
        {isSuccess && bestGames && bestGames.results.length > 0 ? (
          bestGames.results.map((game, index) => {
            return (
              <article
                className="flex w-full flex-col hover:opacity-85 sm:w-[48%] lg:w-80"
                key={index}
              >
                <a href={"#" + game.slug}>
                  <div className="relative w-full">
                    {game.background_image ? (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="h-64 w-full object-cover shadow-sm shadow-black lg:h-40"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-64 w-full items-center justify-center bg-global object-cover shadow-sm shadow-black lg:h-40">
                        <img
                          src={gameekLogo}
                          alt="logo du site"
                          className="h-20"
                        />
                      </div>
                    )}

                    <p className="absolute bottom-0 w-full bg-global bg-opacity-70 text-xs text-customWhite shadow-sm shadow-black">
                      <span className="text-xl text-mainYellow">18</span>
                      ∕20 <span className="">(5 avis)</span>
                    </p>

                    <div className="absolute right-0 top-0 flex flex-wrap gap-1">
                      {game.genres.map((genre, index) => (
                        <GenreBadge genre={genre.name} key={index} />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-lg">{game.name}</h3>
                  <div className="flex flex-wrap items-center gap-2">
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
