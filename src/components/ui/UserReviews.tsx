import { useReviewsByUserQuery } from "@/queries/useReviewsQuery";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { Loader } from "./Loader";

export const UserReviews = () => {
  const { reviewsByUser, isLoading } = useReviewsByUserQuery();
  const { user } = useUser();
  const statusColor = {
    valide: "bg-green-200 text-green-800",
    refuse: "bg-red-200 text-red-800",
    a_modifier: "bg-yellow-200 text-yellow-800",
    en_attente: "bg-gray-200 text-gray-800",
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="flex w-full flex-wrap gap-2 rounded-md bg-customWhite px-2 py-3">
          {reviewsByUser?.reviews && reviewsByUser.reviews.length > 0 ? (
            reviewsByUser.reviews.map((r, index) => (
              <Link
                to={`/test/${r.slug}/${user?.username}`}
                key={index}
                className="hover:opacity-80"
              >
                <article className="relative flex flex-wrap shadow-lg shadow-black md:h-60 md:w-[245px]">
                  <img
                    src={r.background_image}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bg-surface p-2">
                    <h3 className="font-semibold text-light">{r.name}</h3>
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 p-2 ${statusColor[r.status]}`}
                  >
                    <p className="font-semibold">
                      {r.status.replace("_", " ")}
                    </p>
                  </div>
                  <div className="absolute bottom-0 flex items-center bg-global bg-opacity-70 px-0.5 text-xs text-customWhite shadow-sm shadow-black">
                    <p className="text-xl font-semibold text-mainYellow">
                      {r.grade}
                    </p>
                    ∕20
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <p>Vous n’avez pas encore rédigé de test.</p>
          )}
        </section>
      )}
    </>
  );
};
