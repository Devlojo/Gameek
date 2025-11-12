import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { user } = useUser();

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Mon profil
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center gap-2 rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <p className="text-center font-semibold">Avatar :</p>

          <img
            src={user?.image}
            alt={`Avatar de ${user?.username}`}
            className="size-20 rounded-full shadow-sm shadow-black"
          ></img>
          <div className="flex flex-col justify-start gap-2 border border-black/20 p-4">
            <p>
              <span className="font-semibold">Pseudo : </span>
              {user?.username}
            </p>
            <p>
              <span className="font-semibold">Adresse mail : </span>
              {user?.email}
            </p>
            <p>
              <span className="font-semibold">
                Date de création de compte :{" "}
              </span>
              {user?.created_at.slice(0, 10).split("-").reverse().join("/")}
            </p>
            <Link
              to={"/modification-du-compte"}
              className="p-2 text-center shadow-md shadow-black hover:bg-mainYellow"
            >
              Modifier le profil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
