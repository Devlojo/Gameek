import { useState } from "react";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useCsrfToken } from "@/hooks/useCsrfToken";
import { apiUrl } from "@/config";

type TForm = {
  username: string;
  password: string;
  email: string;
  image: string;
};

export const SignIn = (): JSX.Element => {
  const { user, setUser } = useUser();
  const { setCsrfToken } = useCsrfToken();

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
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [requestError, setRequestError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      image:
        "https://api.dicebear.com/9.x/avataaars/svg?seed=" +
        avatars[0] +
        "&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear",
    },
  });

  // redirection vers l'accueil si l'utilisateur est connecté, replace permet de retirer la page dans l'historique du navigateur
  if (user) {
    return <Navigate to="/" replace />;
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
      const res = await axios.post(apiUrl + "/signin", data, {
        withCredentials: true, // pour que le cookie HttpOnly (refreshToken) soit envoyé automatiquement
      });
      if (res.status === 201) {
        setUser(res.data.user);
        setCsrfToken(res.data.csrfToken);
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
        Inscription
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
                {...register("email", { required: true })}
                type="email"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre email"
                id="email"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-600">L'adresse mail est requis</span>
              )}
            </label>
            <label htmlFor="username">
              Pseudo
              <input
                {...register("username", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                })}
                type="text"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre pseudo"
                id="username"
              />
              {errors.username?.type === "required" && (
                <span className="text-red-600">Le pseudo est requis</span>
              )}
              {errors.username?.type === "maxLength" && (
                <span className="text-red-600">
                  Le pseudo ne doit pas contenir plus de 20 caractères
                </span>
              )}
              {errors.username?.type === "minLength" && (
                <span className="text-red-600">
                  Le pseudo doit au moins contenir 6 caractères
                </span>
              )}
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
            <div className="flex justify-center">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global">
                Créer le compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
