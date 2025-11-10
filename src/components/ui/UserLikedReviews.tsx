import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { useLikedReviewsByUserQuery } from "@/queries/useLikesQuery";

export const UserLikedReviews = () => {
  const { likedReviews, isLoading } = useLikedReviewsByUserQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="flex w-full flex-wrap gap-2 rounded-md bg-customWhite px-2 py-3">
          {likedReviews?.reviews && likedReviews.reviews.length > 0 ? (
            likedReviews.reviews.map((r, index) => (
              <Link
                to={`/test/${r.slug}/${r.reviewer_name}`}
                key={index}
                className="shadow-md shadow-black hover:opacity-80 md:w-[245px]"
              >
                <article className="relative flex flex-wrap md:h-60 md:w-[245px]">
                  <img
                    src={r.background_image}
                    className="w-full object-cover"
                    loading="lazy"
                  />

                  <div
                    className={`absolute top-0 flex flex-wrap items-center gap-1 bg-surface/60 p-1`}
                  >
                    <img
                      src={r.avatar}
                      alt="Avatar de l'utilisateur"
                      className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                    />
                    <p className="text-sm font-semibold text-light">
                      {r.reviewer_name}
                    </p>
                  </div>
                  <div className="absolute bottom-0 flex items-center bg-global bg-opacity-70 px-0.5 text-xs text-customWhite shadow-sm shadow-black">
                    <p className="text-xl font-semibold text-mainYellow">
                      {r.grade}
                    </p>
                    ∕20
                  </div>
                </article>
                <div className="flex w-full flex-wrap items-center justify-center bg-surface py-3">
                  <h3 className="font-semibold text-light">{r.game_name}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p>Aucun test aimé pour le moment, explorez et laissez un like !</p>
          )}
        </section>
      )}
    </>
  );
};
