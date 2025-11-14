import { InputStrengthOrWeakness } from "@/components/form/InputStrengthOrWeakness";
import { useUser } from "@/hooks/useUser";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { reviewEditSchema } from "@/types/review";
import { useEffect, useState } from "react";
import { useCsrfToken } from "@/hooks/useCsrfToken";
import { apiUrl } from "@/config";
import { ImBlocked } from "react-icons/im";
import { useReviewDetailQuery } from "@/queries/useReviewsQuery";
import { Loader } from "@/components/ui/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { AlertModalReview } from "@/components/ui/AlertModalReview";

type TForm = z.infer<typeof reviewEditSchema>;

export const EditReview = (): JSX.Element => {
  const { gameSlug, userName } = useParams() as {
    gameSlug: string;
    userName: string;
  };
  const { user } = useUser();
  const { csrfToken } = useCsrfToken();
  const queryClient = useQueryClient();

  const { reviewDetail, isLoading, isSuccess } = useReviewDetailQuery(
    gameSlug,
    userName,
  );

  const [requestError, setRequestError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isOpenSuccessMessage, setIsOpenSuccessMessage] =
    useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      id: reviewDetail?.review.id,
    },
  });

  useEffect(() => {
    if (reviewDetail?.review) {
      reset(reviewDetail.review); // pré-remplissage une fois les données disponibles
    }
  }, [reviewDetail, reset]);

  const onSubmit = async (data: TForm) => {
    const parsedData = {
      ...data,
    };
    try {
      const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
        withCredentials: true,
      });

      const res = await axios.patch(
        apiUrl + "/reviews/edit/" + reviewDetail?.review.id,
        parsedData,
        {
          withCredentials: true,
          headers: {
            "x-csrf-token": csrfRes.csrfToken,
          }, // pour que le cookie HttpOnly (refreshToken) soit envoyé automatiquement
        },
      );

      if (res.status === 200) {
        setIsOpenSuccessMessage(true);
        setSuccessMessage(res.data.message);
        setTimeout(() => {
          // Status repasse à "en_attente", on force le refetch
          queryClient.invalidateQueries({
            queryKey: ["reviewDetail", gameSlug, userName],
          });
          navigate("/");
        }, 3000);
      }
    } catch (error: any) {
      setErrorMessage(error.response.data?.message);

      setRequestError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!user && !csrfToken) {
    return <Navigate to="/connexion" replace />;
  }

  if (
    user?.role !== "user" ||
    reviewDetail?.review.status !== "a_modifier" ||
    user.username !== reviewDetail.review.username
  ) {
    return <Navigate to="/" />;
  }

  if (isLoading || !isSuccess) return <Loader />;

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Modification de test
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[600px]">
          <AlertModalReview
            title="Sois respectueux !"
            description=" Petit rappel : ton test sera relu par un modérateur avant
              publication. Merci de rester poli et respectueux lors de ton test
              !"
            buttonLabel="J'ai compris"
          />
          {isOpenSuccessMessage && (
            <AlertModalReview
              title="Changement enregistré"
              description={successMessage}
              type="success"
            />
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            {requestError && (
              <div className="flex items-center gap-2 text-red-600">
                <ImBlocked size={14} />
                <p className="font-bold">{errorMessage}</p>
              </div>
            )}
            <label htmlFor="introduction">
              Introduction *
              <textarea
                {...register("introduction", {
                  required: true,
                  maxLength: 255,
                })}
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Petite phrase d'accroche"
                id="introduction"
              />
              {errors.introduction?.type === "required" && (
                <span className="text-red-600">
                  L'introduction est obligatoire
                </span>
              )}
              {errors.introduction?.type === "maxLength" && (
                <span className="text-red-600">
                  L'introduction ne doit pas dépasser les 255 caractères
                </span>
              )}
            </label>

            <label htmlFor="universe">
              Univers et scénario *
              <textarea
                {...register("universe", { required: true })}
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : l'histoire est ultra prenante"
                id="universe"
              />
              {errors.universe?.type === "required" && (
                <span className="text-red-600">
                  Le champ univers et scénario est obligatoire
                </span>
              )}
            </label>
            <label htmlFor="gameplay">
              Gameplay et prise en main *
              <textarea
                {...register("gameplay", { required: true })}
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : hyper fun à jouer"
                id="gameplay"
              />
              {errors.gameplay?.type === "required" && (
                <span className="text-red-600">
                  Le champ gameplay et prise en main est obligatoire
                </span>
              )}
            </label>
            <label htmlFor="graphics">
              Réalisation et bande-son <span className="font-bold">*</span>
              <textarea
                {...register("graphics", { required: true })}
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : un régal pour les yeux et oreilles"
                id="graphics"
              />
              {errors.graphics?.type === "required" && (
                <span className="text-red-600">
                  Le champ réalisation et bande-son est obligatoire
                </span>
              )}
            </label>
            <label htmlFor="conclusion">
              Conclusion *
              <textarea
                {...register("conclusion", { required: true, minLength: 1 })}
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : j'ai adoré le jeu du début à la fin, je ne peux que le recommander pour tous les gamers"
                id="conclusion"
              />
              {errors.conclusion?.type === "required" && (
                <span className="text-red-600">
                  La conclusion est obligatoire
                </span>
              )}
            </label>
            <label htmlFor="grade" className="flex flex-col">
              Note *
              <input
                type="number"
                className="w-12 border-b border-global p-1 shadow-sm shadow-global hover:cursor-not-allowed"
                min={0}
                max={20}
                placeholder="0"
                id="grade"
                disabled
                value={reviewDetail?.review.grade}
              />
            </label>
            <label htmlFor="strenghts" className="flex flex-col gap-2">
              Points forts
              {/* ...Array(5) permet de créer un tableau rapide d'une longueur de 5, l'argument _ permet d'ignorer le 1er param*/}
              {[...Array(5)].map((_, index) => (
                <InputStrengthOrWeakness
                  key={index}
                  category={`strengths`}
                  textExample={`Point fort #${index + 1}`}
                  register={register}
                  index={index}
                />
              ))}
            </label>
            <label htmlFor="weaknesses" className="flex flex-col gap-2">
              Points faibles
              {[...Array(5)].map((_, index) => (
                <InputStrengthOrWeakness
                  key={index}
                  category={`weaknesses`}
                  textExample={`Point faible #${index + 1}`}
                  register={register}
                  index={index}
                />
              ))}
            </label>
            <p className="font-bold italic">
              Les champs suivis d’un astérisque (*) doivent être remplis.
            </p>
            <div className="flex justify-center gap-2">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global">
                Valider la modification
              </button>
              <Link
                to={"/mon-activite"}
                className="rounded-lg p-2 shadow-sm shadow-global hover:opacity-80"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
