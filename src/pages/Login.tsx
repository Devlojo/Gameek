import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TUser } from "@/types/user";
import { useNavigate, Navigate } from "react-router-dom";

type TForm = {
  password: string;
  email: string;
};

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  user: TUser | null;
  setCsrfToken: React.Dispatch<React.SetStateAction<string | null>>;
};
export const Login = ({
  setUser,
  user,
  setCsrfToken,
}: LoginProps): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<TForm>();
  const apiUrl = import.meta.env.VITE_API_URL;

  // redirection vers l'accueil si l'utilisateur est connecté, replace permet de retirer la page dans l'historique du navigateur
  if (user) {
    return <Navigate to="/" replace />;
  }
  const onSubmit = async (data: TForm) => {
    try {
      const res = await axios.post(apiUrl + "/login", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser(res.data.user);
        setCsrfToken(res.data.csrfToken);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la connexion. Vérifiez vos identifiants");
    }
  };
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Connexion
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
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

            <label htmlFor="password">
              Mot de passe
              <input
                {...register("password", {
                  required: true,
                })}
                type="password"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre mot de passe"
                id="password"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">Le mot de passe est requis</span>
              )}
            </label>
            <Link to="/inscription" className="underline">
              Pas de compte? Créez un compte ici
            </Link>
            <div className="flex justify-center">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global">
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
