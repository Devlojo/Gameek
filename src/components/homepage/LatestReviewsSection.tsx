import { useLatestReviewsQuery } from "@/queries/useGamesQuery";
import avatar from "@/images/sample-avatar.png";
import { Loader } from "@/components/ui/Loader";
import gameekLogo from "@/images/gameek-removebg.png";
import { IoIosTimer } from "react-icons/io";
import { GameHoverCard } from "../ui/GameHoverCard";

export const LatestReviewsSection = () => {
  const { latestReviews, isSuccess } = useLatestReviewsQuery();

  return (
    <section className="h-auto rounded-md bg-customWhite px-4 py-3">
      <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
        <h2 className="text-2xl font-bold">Les derniers tests</h2>
        <div className="my-1 flex items-center justify-center gap-1">
          <p>10 tests les plus récents</p>
          <IoIosTimer className="size-5 text-global" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 sm:justify-center">
        {isSuccess && latestReviews && latestReviews.results.length > 0 ? (
          latestReviews.results.map((game, index) => {
            return (
              <article
                className="group relative w-full rounded-md p-2 shadow-md shadow-black sm:w-[48.5%]"
                key={index}
              >
                <a href={"#" + game.slug}>
                  <div className="relative w-full">
                    {game.background_image ? (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="h-64 w-full object-cover shadow-md shadow-black"
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

                    <p className="absolute bottom-0 bg-global bg-opacity-70 px-0.5 text-xs text-gray-200 shadow-sm shadow-black">
                      <span className="text-xl text-mainYellow">18</span>
                      ∕20
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col gap-3 sm:h-[250px] sm:justify-between sm:gap-0 md:h-[220px] lg:h-[180px]">
                    <h3 className="text-lg font-bold">{game.name}</h3>
                    <p className="italic">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Incidunt soluta vitae quas, debitis omnis nesciunt sint!
                      Labore quasi molestias nihil sed delectus saepe
                      consectetur reprehenderit culpa nulla, nemo doloremque
                      repellendus.
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={avatar}
                        className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                        alt="Avatar du testeur"
                      />
                      <p className="text-sm">Jack, le 15/11/2023 à 15h50</p>
                    </div>
                  </div>
                  <GameHoverCard
                    platforms={game.platforms}
                    genres={game.genres}
                    info="Voir le test"
                  />
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
