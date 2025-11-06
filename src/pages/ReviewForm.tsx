import { InputStrengthOrWeakness } from "@/components/form/InputStrengthOrWeakness";
import { useUser } from "@/hooks/useUser";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { AlertModalReview } from "@/components/ui/AlertModalReview";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { reviewFormSchema } from "@/types/review";
import { useState } from "react";
import { useCsrfToken } from "@/hooks/useCsrfToken";
import { apiUrl } from "@/config";

type TForm = z.infer<typeof reviewFormSchema>;
type TReviewFormProps = {
  setAlertModalCreatedReview: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ReviewForm = ({
  setAlertModalCreatedReview,
}: TReviewFormProps): JSX.Element => {
  const { user } = useUser();
  const { csrfToken } = useCsrfToken();
  if (!user && !csrfToken) {
    return <Navigate to="/connexion" replace />;
  }

  if (user?.role !== "user") {
    return <Navigate to="/" />;
  }
  const [requestError, setRequestError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation(); // récuperation du chemin courant
  const getGameFromUrl = location.pathname.split("/")[3];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      slug: getGameFromUrl,
    },
  });

  const onSubmit = async (data: TForm) => {
    const parsedData = {
      ...data,
      grade: Number(data.grade), // convertit la string en number
    };
    try {
      const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
        withCredentials: true,
      });

      const res = await axios.post(apiUrl + "/reviews/create", parsedData, {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfRes.csrfToken,
        }, // pour que le cookie HttpOnly (refreshToken) soit envoyé automatiquement
      });

      if (res.status === 201) {
        setAlertModalCreatedReview(true);
        navigate("/");
      }
    } catch (error: any) {
      setErrorMessage(error.response.data?.message);

      setRequestError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Création de test
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            {requestError && (
              <p className="font-bold text-red-600">{errorMessage}</p>
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
                {...register("grade", {
                  required: true,
                  min: 0,
                  max: 20,
                  valueAsNumber: true,
                })}
                type="number"
                className="w-12 border-b border-global p-1 shadow-sm shadow-global"
                min={0}
                max={20}
                placeholder="0"
                id="grade"
              />
              {errors.grade?.type === "min" && (
                <span className="text-red-600">
                  Le note ne doit pas être inférieur à 0
                </span>
              )}
              {errors.grade?.type === "max" && (
                <span className="text-red-600">
                  Le note ne doit pas être supérieur à 20
                </span>
              )}
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
            <div className="flex justify-center">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global">
                Créer le test
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
