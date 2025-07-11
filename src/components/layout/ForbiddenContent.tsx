import { Link } from "react-router-dom";

export const ForbiddenContent = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-customWhite">
      <h1 className="text-center text-3xl font-bold">Contenu indisponible</h1>
      <p className="text-center">
        Oups, on dirait bien que tu fais fausse route
      </p>

      <Link
        to="/"
        className="rounded-md bg-mainYellow p-2 text-global hover:opacity-65"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};
