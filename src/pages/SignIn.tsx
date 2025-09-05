import { useState } from "react";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { TUser } from "@/types/user";

type TForm = {
  username: string;
  password: string;
  email: string;
  image: string;
};

type SignInProps = {
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  user: TUser | null;
  setCsrfToken: React.Dispatch<React.SetStateAction<string | null>>;
};
export const SignIn = ({
  setUser,
  setCsrfToken,
  user,
}: SignInProps): JSX.Element => {
  const avatars = [
    "adventurer",
    "bottts",
    "avataaars",
    "avataaars-neutral",
    "lorelei",
    "croodles",
    "fun-emoji",
    "personas",
    "pixel-art",
    "shapes",
    "thumbs",
    "open-peeps",
    "big-smile",
    "notionists",
    "micah",
    "glass",
    "rings",
    "lorelei-neutral",
  ];
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [requestError, setRequestError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      image: "https://api.dicebear.com/9.x/adventurer/svg",
    },
  });

  // redirection vers l'accueil si l'utilisateur est connecté, replace permet de retirer la page dans l'historique du navigateur
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
    // pour recupérer l'url complet de l'image pour envoyer en BDD"
    setValue("image", `https://api.dicebear.com/9.x/${avatar}/svg`);
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
            {selectedAvatar && (
              <div className="flex justify-center">
                <img
                  src={`https://api.dicebear.com/9.x/${selectedAvatar}/svg`}
                  className="size-20 rounded-full shadow-sm shadow-black"
                ></img>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-4 py-4">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={`https://api.dicebear.com/9.x/${avatar}/svg`}
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
