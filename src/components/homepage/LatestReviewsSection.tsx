import { useLatestReviewsQuery } from "@/queries/useReviewsQuery";
import gameekLogo from "@/images/gameek-removebg.png";
import { IoIosTimer } from "react-icons/io";
import { GameHoverCard } from "../ui/GameHoverCard";
import { Link } from "react-router-dom";
import { Loader } from "../ui/Loader";

export const LatestReviewsSection = () => {
  const { latestReviews, isSuccess, isLoading } = useLatestReviewsQuery();

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
        {isLoading && <Loader />}
        {isSuccess && latestReviews && latestReviews.reviews.length > 0 ? (
          latestReviews.reviews.map((review, index) => {
            return (
              <article
                className="group relative w-full rounded-md p-2 shadow-md shadow-black sm:w-[48.5%]"
                key={index}
              >
                <Link to={`/test/${review.slug}/${review.username}`}>
                  <div className="relative w-full">
                    {review.background_image ? (
                      <img
                        src={review.background_image}
                        alt={review.gamename}
                        className="h-64 w-full object-cover shadow-md shadow-black"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-64 w-full items-center justify-center bg-global object-cover shadow-sm shadow-black">
                        <img
                          src={gameekLogo}
                          alt="logo du site"
                          className="h-32"
                        />
                      </div>
                    )}

                    <p className="absolute bottom-0 bg-global bg-opacity-70 px-0.5 text-xs text-customWhite shadow-sm shadow-black">
                      <span className="text-xl font-semibold text-mainYellow">
                        {review.grade}
                      </span>
                      ∕20
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col gap-3 sm:h-[250px] sm:justify-between sm:gap-0 md:h-[220px] lg:h-[180px]">
                    <h3 className="text-lg font-semibold">{review.gamename}</h3>
                    <p className="italic">{review.introduction}</p>
                    <div className="flex items-center gap-2">
                      <img
                        src={review.image}
                        className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                        alt="Avatar du testeur"
                      />
                      <p className="text-sm">
                        <span className="font-semibold">{review.username}</span>
                        , {review.created_at}
                      </p>
                    </div>
                  </div>
                  {
                    <GameHoverCard
                      platforms={review.platforms}
                      genres={review.genres}
                      info="Voir le test"
                    />
                  }
                </Link>
              </article>
            );
          })
        ) : (
          <p>Pas de test disponible</p>
        )}
      </div>
    </section>
  );
};
