import { useNavigate, useParams } from "react-router-dom";
import { GameHeader } from "@/components/game/GameHeader";
import { PageNotFound } from "@/components/layout/PageNotFound";
import { MdArrowDropDown } from "react-icons/md";
import { useReviewDetailQuery } from "@/queries/useReviewsQuery";
import { Loader } from "@/components/ui/Loader";
import axios from "axios";
import { CiSquareInfo } from "react-icons/ci";
import { useState } from "react";
import { Comments } from "@/components/ui/Comments";
import { useUser } from "@/hooks/useUser";
import { apiUrl } from "@/config";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useToggleLike } from "@/queries/useLikesQuery";

export const Review = () => {
  const { gameSlug, userName } = useParams() as {
    gameSlug: string;
    userName: string;
  };
  const { user } = useUser();
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { reviewDetail, isLoading, isError } = useReviewDetailQuery(
    gameSlug,
    userName,
  );

  // l'objet mutate représente la fonction mutate du hook de tanstack query
  const { mutate: toggleLikeMutate } = useToggleLike(gameSlug, userName);

  const reviewStatus = [
    { value: "en_attente", label: "En attente" },
    { value: "valide", label: "Validé" },
    { value: "a_modifier", label: "À modifier" },
    { value: "refuse", label: "Refusé" },
  ];

  const [selectedStatus, setSelectedStatus] = useState(reviewStatus[0].value);
  if (isLoading) {
    return <Loader />; // ton loader custom
  }

  if (isError) {
    return <PageNotFound />;
  }
  if (reviewDetail?.review.status !== "valide" && user?.role !== "admin") {
    return (
      <div className="mt-4 flex h-32 flex-col items-center justify-center bg-customWhite shadow-md shadow-blue-500">
        <CiSquareInfo className="size-10 text-blue-500" />
        <p className="text-center">
          {" "}
          Le test est en attente de confirmation de la part de l'admin
        </p>
      </div>
    );
  }

  const handleOnChange = async (e: any) => {
    const newStatus = e.target.value;
    try {
      setSelectedStatus(newStatus);
      const res = await axios.put(
        `${apiUrl}/back/reviews/${reviewDetail?.review.id}`,
        { status: newStatus }, // body à envoyer
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        navigate("/back");
      }
    } catch (error: any) {
      setRequestError(true);
      setErrorMessage(error.response.data?.message);
    }
  };

  return (
    <>
      <GameHeader
        background_image={reviewDetail?.review.background_image}
        name={reviewDetail?.review.gamename}
        isReview={true}
        slug={gameSlug}
      >
        <div className="flex flex-col items-center">
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">
            Test réalisé par
          </h2>
          <div className="flex items-center gap-2">
            <img
              src={reviewDetail?.review.image}
              className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
              alt="Avatar du testeur"
            />
            <p className="text-sm">
              <span className="font-semibold">{userName}</span>,{" "}
              {reviewDetail?.review.created_at}
            </p>
          </div>
          <div className="mx-3 mt-5 flex w-full flex-col items-center gap-4 rounded-md border-t border-global/20 p-4 shadow-md shadow-global sm:w-[98%]">
            <p className="italic">{reviewDetail?.review.introduction}</p>

            <nav className="group relative w-72">
              <div className="flex items-center justify-between border border-black p-1">
                <button className="px-1">Sommaire</button>
                <MdArrowDropDown />
              </div>
              <ul className="absolute z-10 hidden w-full border border-black bg-customWhite p-1 group-hover:block">
                <li className="p-1 hover:bg-gray-300">
                  <a href="#univers" className="block">
                    Univers et scénario
                  </a>
                </li>
                <li className="p-1 hover:bg-gray-300">
                  <a href="#gameplay" className="block">
                    Gameplay et prise en main
                  </a>
                </li>
                <li className="p-1 hover:bg-gray-300">
                  <a href="#realisation" className="block">
                    Réalisation et bande-son
                  </a>
                </li>
                <li className="p-1 hover:bg-gray-300">
                  <a href="#conclusion" className="block">
                    Conclusion
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex w-4/5 justify-center border-b border-global/40"></div>
            <section
              className="flex scroll-mt-16 flex-col items-center gap-4"
              id="univers"
            >
              <h2 className="text-xl font-bold sm:text-2xl">
                Univers et scénario
              </h2>

              <p>{reviewDetail?.review.universe}</p>
              <div className="flex w-4/5 justify-center border-b border-global/40"></div>
            </section>
            <section
              className="flex scroll-mt-16 flex-col items-center gap-4"
              id="gameplay"
            >
              <h2 className="text-xl font-bold sm:text-2xl">
                Gameplay et prise en main
              </h2>
              <p>{reviewDetail?.review.gameplay}</p>
              <div className="flex w-4/5 justify-center border-b border-global/40"></div>
            </section>
            <section
              className="flex scroll-mt-16 flex-col items-center gap-4"
              id="realisation"
            >
              <h2 className="text-xl font-bold sm:text-2xl">
                Réalisation et bande-son
              </h2>

              <p>{reviewDetail?.review.graphics}</p>
              <div className="flex w-4/5 justify-center border-b border-global/40"></div>
            </section>
            <section
              className="flex scroll-mt-16 flex-col items-center gap-4"
              id="conclusion"
            >
              <h2 className="text-xl font-bold sm:text-2xl">Conclusion</h2>
              <div className="flex w-full flex-col items-center bg-global/95 p-2 text-light">
                <p>{reviewDetail?.review.conclusion}</p>
                <p className="text-xs">
                  <span className="text-2xl font-semibold text-mainYellow">
                    {reviewDetail?.review.grade}
                  </span>
                  ∕20
                </p>
              </div>
            </section>
            <div className="flex w-full">
              <div className="flex w-1/2 flex-col gap-1">
                <h2 className="text-center text-lg font-bold text-green-600 sm:text-2xl">
                  Points forts
                </h2>
                <ul className="flex flex-col gap-1">
                  {reviewDetail?.review.strengths &&
                    reviewDetail.review.strengths.length > 0 &&
                    reviewDetail.review.strengths.map((strength, index) => (
                      <li className="flex gap-1" key={index}>
                        <span className="font-bold text-green-600">+</span>
                        {strength}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="border-r border-global/40"></div>
              <div className="flex w-1/2 flex-col gap-1">
                <h2 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                  Points faibles
                </h2>
                <ul className="flex flex-col gap-1 pl-5">
                  {reviewDetail?.review.weaknesses &&
                    reviewDetail.review.weaknesses.length > 0 &&
                    reviewDetail.review.weaknesses.map((weakness, index) => (
                      <li className="flex gap-1" key={index}>
                        <span className="font-bold text-red-600">-</span>
                        {weakness}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() =>
                toggleLikeMutate({
                  review_id: reviewDetail?.review.id as number,
                })
              }
              className="flex items-center gap-2 border border-gray-400 p-2 shadow-sm shadow-black md:hover:shadow-indigo-300"
            >
              {reviewDetail?.review.user_id_like ? (
                <BsHeartFill size={20} />
              ) : (
                <BsHeart size={20} />
              )}
              <span>J'aime</span>
            </button>
          </div>
        </div>
        {user?.role === "admin" && (
          <>
            {requestError && (
              <p className="font-bold text-red-600">{errorMessage}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-3">
              <p>Selectionnez un statut de validation pour ce test :</p>
              <select
                value={selectedStatus}
                onChange={(e) => handleOnChange(e)}
                className="rounded-md border border-black p-2"
              >
                {reviewStatus.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <Comments
          gameSlug={gameSlug}
          userName={userName}
          reviewId={reviewDetail?.review.id as number}
        />
      </GameHeader>
    </>
  );
};
