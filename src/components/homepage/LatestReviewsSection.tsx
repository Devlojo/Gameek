import { GenreBadge } from "@/components/ui/GenreBadge";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { useLatestReviewsQuery } from "@/queries/useGamesQuery";
import avatar from "@/images/sample-avatar.png";
import { Loader } from "@/components/ui/Loader";
import gameekLogo from "@/images/gameek-removebg.png";
import { useGenresQuery } from "@/queries/useGenresQuery";
import { usePlatformsQuery } from "@/queries/usePlatformsQuery";
import { MenuItem } from "../ui/MenuItem";

export const LatestReviewsSection = () => {
  const { latestReviews, isSuccess } = useLatestReviewsQuery();
  const { genres } = useGenresQuery();
  const { platforms } = usePlatformsQuery();
  const rateMenu = [{ name: 0 }, { name: 1 }];
  const authorMenu = [{ name: "Jack" }];

  return (
    <section className="h-auto rounded-md bg-customWhite px-4 py-3">
      <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
        <h2 className="text-2xl font-bold">Les derniers tests</h2>
        <div className="my-1 flex justify-center gap-2">
          <MenuItem label="Auteur" items={authorMenu} itemKey="name" />
          <MenuItem label="Note" items={rateMenu} itemKey="name" />
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
        {isSuccess && latestReviews && latestReviews.results.length > 0 ? (
          latestReviews.results.map((game, index) => {
            return (
              <article
                className="p-2 shadow-md shadow-black hover:opacity-85 sm:w-[48%] lg:w-80"
                key={index}
              >
                <a href={"#" + game.slug}>
                  <div className="relative w-full">
                    {game.background_image ? (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="h-40 w-full object-cover shadow-md shadow-black max-lg:h-96 max-lg:w-full"
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

                    <p className="absolute bottom-0 bg-global bg-opacity-70 px-0.5 text-xs text-gray-200 shadow-sm shadow-black">
                      <span className="text-xl text-mainYellow">18</span>
                      ∕20
                    </p>
                    <div className="absolute right-0 top-0 flex flex-wrap gap-1">
                      {game.genres.map((genre, index) => (
                        <GenreBadge genre={genre.name} key={index} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex h-64 flex-col gap-2">
                    <h3 className="text-lg">{game.name}</h3>
                    <p>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={avatar}
                        className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                        alt="Avatar du testeur"
                      />
                      <p className="text-sm">Jack, le 15/11/23</p>
                    </div>
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
