import { useState } from "react";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { apiUrl } from "@/config";
import { Link } from "react-router-dom";
import { AlertModalReview } from "@/components/ui/AlertModalReview";

type TForm = {
  password: string;
  image: string;
};

export const EditProfile = (): JSX.Element => {
  const { user, setUser } = useUser();

  const findAvatar = user?.image.split("?seed=")[1].split("&")[0];

  const avatars = [
    "Katherine",
    "George",
    "Mason",
    "Caleb",
    "Jade",
    "Luis",
    "Easton",
    "Avery",
    "Valentina",
    "Chase",
    "Maria",
    "Aneka",
    "Eliza",
    "Sawyer",
    "Jessica",
    "Ryan",
    "Jocelyn",
    "Brooklynn",
  ];
  const [selectedAvatar, setSelectedAvatar] = useState(findAvatar);
  const [requestError, setRequestError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isOpenSuccessMessage, setIsOpenSuccessMessage] =
    useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      image: user?.image,
    },
  });

  // redirection vers l'accueil si l'utilisateur est connecté, replace permet de retirer la page dans l'historique du navigateur
  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  const handleAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
    // pour recupérer l'url complet de l'image pour envoyer en BDD"
    setValue(
      "image",
      `https://api.dicebear.com/9.x/avataaars/svg?seed=${avatar}&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear`,
    );
  };
  const onSubmit = async (data: TForm) => {
    try {
      const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
        withCredentials: true,
      });
      const res = await axios.patch(apiUrl + "/edit-user", data, {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfRes.csrfToken,
        }, // pour que le cookie HttpOnly (refreshToken) soit envoyé automatiquement
      });
      if (res.status === 200) {
        setIsOpenSuccessMessage(true);
        setSuccessMessage(res.data.message);

        setTimeout(() => {
          setUser(null);
        }, 3000);
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
        Modification du compte
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            {requestError && (
              <p className="font-bold text-red-600">{errorMessage}</p>
            )}
            {isOpenSuccessMessage && (
              <AlertModalReview
                title="Changement enregistré"
                description={successMessage}
                type="success"
              />
            )}

            <p className="text-center">Votre avatar :</p>
            {selectedAvatar && (
              <div className="flex justify-center">
                <img
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${selectedAvatar}&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear`}
                  className="size-20 rounded-full shadow-sm shadow-black"
                ></img>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-4 py-4">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatar}&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear`}
                  alt="avatar"
                  className={clsx(
                    "size-16 rounded-full shadow-sm shadow-black hover:cursor-pointer hover:opacity-50",
                    selectedAvatar === avatar && "border-4 border-mainYellow",
                  )}
                  title="Selectionnez votre avatar"
                  id={avatar}
                  onClick={() => handleAvatar(avatar)}
                />
              ))}
            </div>
            <label htmlFor="email">
              Adresse mail
              <input
                type="email"
                className="w-full border-b border-global bg-gray-200 p-1 shadow-sm shadow-global hover:cursor-not-allowed"
                placeholder="Entrez votre email"
                id="email"
                value={user.email}
                disabled
              />
            </label>
            <label htmlFor="username">
              Pseudo
              <input
                type="text"
                className="w-full border-b border-global bg-gray-200 p-1 shadow-sm shadow-global hover:cursor-not-allowed"
                placeholder="Entrez votre pseudo"
                id="username"
                value={user.username}
                disabled
              />
            </label>
            <label htmlFor="password">
              Mot de passe
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
                type="password"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre mot de passe"
                id="password"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">Le mot de passe est requis</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  Le mot de passe doit au moins contenir 8 caractères
                </span>
              )}
            </label>

            {/* Champ caché pour l'avatar */}
            <input type="hidden" {...register("image")} />
            <div className="flex justify-center gap-2">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global hover:opacity-80">
                Modifier le compte
              </button>
              <Link
                to={"/mon-profil"}
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
