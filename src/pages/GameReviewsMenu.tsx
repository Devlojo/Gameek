import { useParams, useSearchParams } from "react-router-dom";
import { Menu } from "@/components/game/Menu";
import { GameHeader } from "@/components/game/GameHeader";
import { useState } from "react";
import { PageNotFound } from "@/components/layout/PageNotFound";
import { Link } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useReviewsByGameQuery } from "@/queries/useReviewsQuery";
import { useGameDetailQuery } from "@/queries/useGameQuery";
import { clsx } from "clsx";
import { Pagination } from "@/components/ui/Pagination";
import { Loader } from "@/components/ui/Loader";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { useLikesSocket } from "@/hooks/useLikesSocket";
import { useQueryClient } from "@tanstack/react-query";
import { TReviewListByGame } from "@/types/review";

export const GameReviewsMenu = () => {
  const { id } = useParams() as { id: string };
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { reviewsByGame, isError, isLoading } = useReviewsByGameQuery(id);
  const [activeMenu, setActiveMenu] = useState<string>("reviews");
  const { gameDetail } = useGameDetailQuery(id);

  const hasReviews = reviewsByGame && reviewsByGame.reviews.length > 0;
  const headerBackground = hasReviews
    ? reviewsByGame.reviews[0].background_image
    : gameDetail?.background_image;
  const headerName = hasReviews
    ? reviewsByGame.reviews[0].name
    : gameDetail?.name;

  const gameSlug = hasReviews
    ? reviewsByGame.reviews[0].slug
    : gameDetail?.slug;

  const queryClient = useQueryClient();

  //  Écoute les likes en temps réel
  useLikesSocket((reviewId, likeChange) => {
    // 🔹 Mise à jour manuellement du cache React Query pour la query "latestReviews"
    queryClient.setQueryData(
      ["reviewsByGame", gameSlug],
      (oldData: TReviewListByGame | undefined) => {
        // oldData = état actuel du cache
        //  Si le cache est vide, on ne fait rien
        if (!oldData) return oldData;

        // Sinon on retourne un nouvel objet pour le cache
        return {
          ...oldData,
          reviews: oldData.reviews.map((review) =>
            review.id === reviewId
              ? {
                  ...review,
                  likes_count:
                    review.likes_count +
                    likeChange /* met à jour le compteur de likes*/,
                }
              : review,
          ),
        };
      },
    );
  });
  return (
    <>
      {isError ? (
        <PageNotFound />
      ) : (
        <>
          <GameHeader background_image={headerBackground} name={headerName}>
            <Menu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <div className="mx-3 mt-5 flex flex-col gap-3">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div
                    className={clsx(
                      "flex w-full flex-col flex-wrap items-center justify-center gap-2",
                      reviewsByGame &&
                        reviewsByGame.reviews.length > 0 &&
                        "justify-center sm:flex-row sm:justify-between",
                    )}
                  >
                    {reviewsByGame?.reviews &&
                      reviewsByGame.reviews.length > 0 && (
                        <p>{reviewsByGame?.count} test(s) trouvé(s)</p>
                      )}

                    <Link
                      to={`/creation/test/${gameSlug}`}
                      className="flex items-center gap-2 rounded-es-2xl border-2 border-black/40 p-2 hover:bg-global hover:text-customWhite"
                    >
                      Rédigez votre test <FaPen />
                    </Link>
                    {reviewsByGame && reviewsByGame.reviews.length > 0 && (
                      <div className="group relative flex w-44 items-center justify-between border-y border-black/40 p-2 hover:cursor-pointer">
                        <button>Trier par date</button>
                        <MdArrowDropDown />
                        <div className="absolute left-0 top-full z-10 hidden w-full overflow-y-auto rounded-sm bg-customWhite shadow-sm shadow-black group-hover:flex">
                          <ul className="flex w-full flex-col">
                            <li className="p-2 hover:bg-gray-300">
                              Trier par note
                            </li>
                            <li className="p-2 hover:bg-gray-300">
                              Trier par testeur
                            </li>
                            <li className="p-2 hover:bg-gray-300">
                              Trier par popularité
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>{" "}
                  {reviewsByGame && reviewsByGame.reviews.length > 0 ? (
                    reviewsByGame.reviews?.map((review, index) => {
                      return (
                        <article
                          className="bg-customWhite shadow-sm shadow-global hover:opacity-80"
                          key={index}
                        >
                          <Link
                            to={`/test/${review.slug}/${review.username}`}
                            className="flex flex-col sm:flex-row"
                          >
                            <div className="relative w-full">
                              <img
                                src={review.background_image}
                                alt={review.name}
                                className="h-40 w-full object-cover sm:h-[200px]"
                                loading="lazy"
                              />
                              <div className="absolute bottom-0 flex items-center bg-global bg-opacity-70 px-0.5 text-xs text-gray-200 shadow-sm shadow-black">
                                <p className="text-xl text-mainYellow">
                                  {review.grade}
                                </p>
                                ∕20
                              </div>
                              <div className="absolute bottom-0 right-0 flex items-center gap-2 bg-global bg-opacity-70 p-1 text-customWhite">
                                {review.user_id_like ? (
                                  <BsHeartFill className="size-4" />
                                ) : (
                                  <BsHeart className="size-4" />
                                )}
                                {review.likes_count > 0 && (
                                  <p className="text-sm">
                                    {review.likes_count}
                                  </p>
                                )}
                                <BiConversation className="size-4" />
                                {review.comments_count > 0 && (
                                  <p className="text-sm">
                                    {review.comments_count}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex w-full flex-col gap-2 p-2">
                              <p className="italic">{review.introduction}</p>
                              <div className="flex items-center justify-end gap-2">
                                <img
                                  src={review.image}
                                  className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                                  alt="Avatar du testeur"
                                />
                                <p className="text-sm">
                                  <span className="font-semibold">
                                    {review.username}
                                  </span>
                                  , {review.created_at}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </article>
                      );
                    })
                  ) : (
                    <p className="text-center">
                      Ce jeu n'a pas encore été évalué
                    </p>
                  )}
                  <Pagination page={page} totalGames={reviewsByGame?.count} />
                </>
              )}
            </div>
          </GameHeader>{" "}
        </>
      )}
    </>
  );
};
